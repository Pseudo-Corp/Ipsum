import { Player } from "../Types/Player.js";
import { format, sumLinear, sumQuadratic } from "../utility.js";

export interface skillMetadata {
    maxLevel: number;
    expCoefficient: number;
    thresholds: number[];
}

export const skillData: Record<keyof Player["skills"], skillMetadata> = {
    combat: {
        maxLevel: 99,
        expCoefficient: 100,
        thresholds: [0, 50, 90, 96],
    },
    idling: {
        maxLevel: 149,
        expCoefficient: 60,
        thresholds: [0, 50, 100, 140, 146],
    },
    looting: {
        maxLevel: 149,
        expCoefficient: 60,
        thresholds: [0, 50, 100, 140, 146],
    },
};

export abstract class Skills {
    maxLevel: number;
    level: number;
    exp: number;
    expCoefficient: number;
    thresholds: number[];

    constructor(infos: skillMetadata, level = 0, exp = 0) {
        this.maxLevel = infos.maxLevel;
        this.expCoefficient = infos.expCoefficient;
        this.thresholds = infos.thresholds;
        this.level = level;
        this.exp = exp;
        this.calculateLevel();
    }

    calculateEXPToLevelUp(n?: number): number {
        const rawLevel = n || this.level + 1;
        let effectiveLevel = 0;

        if (rawLevel > this.maxLevel) {
            return 0;
        }

        for (let i = 0; i < this.thresholds.length; i++) {
            effectiveLevel +=
                Math.max(0, rawLevel - this.thresholds[i]) * (i + 1);
        }

        return this.expCoefficient * sumQuadratic(effectiveLevel);
    }

    calculateLevel(): void {
        // Prevent a wrongfully terminating loop by not mutating this.level until the end
        let level = this.level;
        for (let i = this.level; i < this.maxLevel; i++) {
            if (
                this.calculateEXPToLevelUp(i + 1) <= this.exp &&
                level < this.maxLevel
            )
                level += 1;
            else break;
        }
        if (level > this.level) {
            // TODO: Alert maybe?
        }
        this.level = level;
    }

    calculateTNL(): number {
        //Should always be positive.
        if (this.level >= this.maxLevel) return 0;
        else return this.calculateEXPToLevelUp(this.level + 1) - this.exp;
    }

    setEXP(amount: number): void {
        this.exp = amount;
        this.level = 0;
        this.calculateLevel();
    }

    gainEXP(amount: number): void {
        this.exp += amount;
        this.calculateLevel();
    }

    abstract computeStatIncrease(level?: number): number;

    abstract computeSkillBonus(level?: number): number;

    // Display Functions (NOTE: Only use this in the chat alerts.)
    displayStatDifference(n: number) {
        return `${format(this.computeStatIncrease(n - 1))} \u2192 ${format(
            this.computeStatIncrease(n)
        )}`;
    }

    displayBonusDifference(n: number) {
        return `${format(this.computeSkillBonus(n - 1), 2)} \u2192 ${format(
            this.computeSkillBonus(n),
            2
        )}`;
    }
}

export class Combat extends Skills {
    constructor(level = 0, exp = 0) {
        super(skillData.combat, level, exp);
    }

    computeStatIncrease(n?: number): number {
        this.calculateLevel();
        const rawLevel = n || this.level;
        let statIncrease = 0;

        for (const threshold of this.thresholds) {
            statIncrease += Math.max(0, rawLevel - threshold);
        }

        return statIncrease;
    }

    computeSkillBonus(n?: number): number {
        this.calculateLevel();
        const rawLevel = n || this.level;
        let bonusMultiplier = 1;
        const bonusCoefficient = 0.01;

        for (const threshold of this.thresholds) {
            bonusMultiplier +=
                Math.max(0, rawLevel - threshold) * bonusCoefficient;
        }

        return bonusMultiplier;
    }
}

export class Idling extends Skills {
    constructor(level = 0, exp = 0) {
        super(skillData.idling, level, exp);
    }

    computeStatIncrease(n?: number): number {
        this.calculateLevel();
        const rawLevel = n || this.level;
        return sumLinear(rawLevel);
    }

    computeSkillBonus(n?: number): number {
        this.calculateLevel();
        const rawLevel = n || this.level;

        return 1 + 0.01 * rawLevel;
    }
}

export class Looting extends Skills {
    constructor(level = 0, exp = 0) {
        super(skillData.looting, level, exp);
    }

    computeStatIncrease(n?: number): number {
        this.calculateLevel();
        const rawLevel = n || this.level;

        return Math.floor(rawLevel / 10);
    }

    computeSkillBonus(n?: number): number {
        this.calculateLevel();
        const rawLevel = n || this.level;

        return 1 + 0.01 * rawLevel;
    }
}

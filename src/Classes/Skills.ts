import { sumQuadratic } from "../utility";

export enum MAXSKILLS {
    combat = 99,

}

export enum COEFFICIENTS {
    combat = 100,

}

export abstract class Skills {
    maxLevel: number
    level: number
    exp: number
    expCoefficient: number
    thresholds: Array<number>

    constructor(maxLevel: MAXSKILLS, level: number, exp: number, expCoefficient: COEFFICIENTS) {
        this.maxLevel = maxLevel;
        this.level = level;
        this.exp = exp;
        this.expCoefficient = expCoefficient;
        // Levels that define a "break point", essentially checkpoints for the skill.
        this.thresholds = [0, 50, 90, 96]
    };

    calculateEXPToLevelUp(n?: number):number {
        let rawLevel = n || this.level
        let effectiveLevel = 0;

        for (let i = 0; i < this.thresholds.length; i++) {
            effectiveLevel += Math.max(0, rawLevel - this.thresholds[i]) * (i + 1);
        }

        return this.expCoefficient * sumQuadratic(effectiveLevel);
    }

    calculateLevel():void {
        let level = this.level;
        for (let i = this.level; i <= this.maxLevel; i++) {
            if (this.expCoefficient * sumQuadratic(i) <= this.exp)
                level += 1;
            else
                break
        }
        if (level > this.level) {
            // TODO: Alert maybe?
        }
        this.level = level;
    }

    calculateTNL():number {
        this.calculateLevel();
        //Should always be positive.
        return this.calculateEXPToLevelUp(this.level + 1) - this.exp;
    }

    setEXP(amount: number):void {
        this.exp = amount;
    }

    gainEXP(amount: number):void {
        this.exp += amount;
    }

    abstract computeStatIncrease():number;

    abstract computeSkillBonus():number;
}

export class Combat extends Skills {

    constructor(maxLevel = MAXSKILLS.combat, level = 0, exp = 0, expCoefficient = COEFFICIENTS.combat) {
        super(maxLevel, level, exp, expCoefficient)
    }

    computeStatIncrease():number {
        this.calculateLevel();
        let statIncrease:number = 0;

        for (const threshold of this.thresholds) {
            statIncrease += Math.max(0, this.level - threshold)
        }

        return statIncrease
    }

    computeSkillBonus():number {
        this.calculateLevel();
        let bonusMultiplier = 1
        const bonusCoefficient = 0.01
        
        for (const threshold of this.thresholds) {
            bonusMultiplier += Math.max(0, bonusCoefficient * (this.level - threshold))
        }
        
        return bonusMultiplier
    }
}
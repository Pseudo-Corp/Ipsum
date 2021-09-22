import { player } from '../Main';
import { Player } from '../Types/Player';
import { format } from '../utility';

export interface statMetadata {
    baseStat: number;
}

export const statData: Record<keyof Player['stats'], statMetadata> = {
    health: {
        baseStat: 100
    },
    strength: {
        baseStat: 0
    },
    damage: {
        baseStat: 10
    },
    defense: {
        baseStat: 0,
    },
    armor: {
        baseStat: 0,
    },
    criticalChance: {
        baseStat: 0,
    },
    criticalDamage: {
        baseStat: 0,
    }
};

export abstract class Stat {
    value: number;
    constructor(infos: statMetadata) {
        this.value = infos.baseStat;
    }

    abstract updateStat(): void;

    displayStat(): string {
        return format(this.value, 0);
    }
}

export class Health extends Stat {
    current: number;
    constructor() {
        super(statData.health);
        this.current = this.value;
    }

    checkBoundary(): void {
        this.current = Math.min(this.current, this.value);
        if (this.current < 0) {
            this.current = this.value;
            console.log("You've DIED. Note: Implement Death!");
        }
    }

    heal(n: number): void {
        this.current += n;
        this.checkBoundary();
    }

    takeDamage(n: number): void {
        this.heal(-n);
    }

    displayCurrentHealth(): string {
        return format(this.current, 0);
    }

    updateStat(): void {
        let health = 0;
        const base = statData.health.baseStat;
        const skill = player.skills.idling.computeStatIncrease();
        for (const boost of [base, skill]) {
            health += boost;
        }
        this.value = health;
        this.checkBoundary();
    }
}

export class Strength extends Stat {
    constructor() {
        super(statData.strength);
    }

    updateStat(): void {
        let strength = 0;
        const base = statData.strength.baseStat;
        const skill = player.skills.combat.computeStatIncrease();
        for (const boost of [base, skill]) {
            strength += boost;
        }
        this.value = strength;
    }
}

export class Damage extends Stat {
    constructor() {
        super(statData.damage);
    }

    updateStat(): void {
        let damage = 0;
        const base = statData.damage.baseStat;
        for (const boost of [base]) {
            damage += boost;
        }
        this.value = damage;
    }
}
export class Defense extends Stat {
    constructor() {
        super(statData.defense)
    }
    updateStat() {
        let defense = 0;
        const base = statData.defense.baseStat;
        for (const boost of [base]) {
            defense += boost
        }
        this.value = defense
    }
}
export class Armor extends Stat {
    constructor() {
        super(statData.armor)
    }
    updateStat() {
        let armor = 0;
        const base = statData.armor.baseStat
        for (const boost of [base]) {
            armor += boost
        }
        this.value = armor
    }
}
export class CriticalChance extends Stat {
    constructor() {
        super(statData.criticalChance)
    }
    updateStat() {
        let critChance = 0
        const base = statData.criticalChance.baseStat
        const skill = player.skills.looting.computeStatIncrease();
        for (const boost of [base, skill]) {
            critChance += boost
        }
        this.value = critChance
    }
}
export class CriticalDamage extends Stat {
    constructor() {
        super(statData.criticalDamage)
    }
    updateStat() {
        let critDamage = 0
        const base = statData.criticalDamage.baseStat
        for (const boost of [base]) {
            critDamage += boost
        }
        this.value = critDamage
    }
}
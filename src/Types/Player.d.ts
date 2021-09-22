import type { Combat, Idling, Looting } from '../Classes/Skills';
import type {
    Armor,
    CriticalChance,
    CriticalDamage,
    Damage,
    Defense,
    Health,
    Strength
} from '../Classes/Stats';

export interface Player {
    statistics: {
        firstPlayed: Date;
        timeElapsed: number;
        version: string;
    };
    skills: {
        combat: Combat;
        idling: Idling;
        looting: Looting;
    };
    stats: {
        health: Health;
        damage: Damage;
        strength: Strength;
        defense: Defense;
        armor: Armor;
        criticalChance: CriticalChance;
        criticalDamage: CriticalDamage;
    };
}

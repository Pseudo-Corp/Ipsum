import { Combat, Idling, Looting } from './Classes/Skills';
import { Armor, CriticalChance, CriticalDamage, Damage, Defense, Health, Strength } from './Classes/Stats';
import type { Player } from './Types/Player';

export const player: Player = {
    statistics: {
        firstPlayed: new Date(),
        timeElapsed: 0,
        version: 'V0.0.1'
    },
    skills: {
        combat: new Combat(),
        idling: new Idling(),
        looting: new Looting()
    },
    stats: {
        health: new Health(),
        strength: new Strength(),
        damage: new Damage(),
        defense: new Defense(),
        armor: new Armor(),
        criticalChance: new CriticalChance(),
        criticalDamage: new CriticalDamage(),
    }
};

console.log(player.skills.combat.computeSkillBonus(77));

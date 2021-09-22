import { Combat, Idling, Looting } from './Classes/Skills.js';
import { Damage, Health, Strength } from './Classes/Stats.js';
import type { Player } from './Types/Player.js';

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
        damage: new Damage()
    }
};

console.log(player.skills.combat.computeSkillBonus(77));

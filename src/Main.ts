import { Combat, Idling, Looting } from "./Classes/Skills"
import { Health } from "./Classes/Stats"
import type { Player } from "./Types/Player"

export const player: Player = {
    statistics: {
        firstPlayed: new Date(),
        timeElapsed: 0,
        version: "V0.0.1"
    },
    skills: {
        combat: new Combat(),
        idling: new Idling(),
        looting: new Looting(),
    },
    stats: {
        health: new Health(),
    }
}

console.log(player.skills.combat.computeSkillBonus(77))
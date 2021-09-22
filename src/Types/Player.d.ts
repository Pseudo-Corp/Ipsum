import type { Combat, Idling, Looting } from "../Classes/Skills.js"
import type { Damage, Health, Strength } from "../Classes/Stats.js";

export interface Player {
    statistics: {
        firstPlayed: Date
        timeElapsed: number
        version: string
    },
    skills: {
        combat: Combat,
        idling: Idling,
        looting: Looting
    },
    stats: {
        health: Health,
        damage: Damage,
        strength: Strength,
    },
}
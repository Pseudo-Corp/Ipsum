import { player } from "../Main";
import { format } from "../utility"
import type { Player } from "../Types/Player"

export enum BASESTATS {
    health = 100,
    damage = 5,
    strength = 0,
    defense = 0,
    criticalDamage = 0,
    criticalChance = 0, 
}

export abstract class Stat {
    value: number
    constructor(base: BASESTATS) {
        this.value = base;
    }

    abstract updateStat():void

    displayStat():string {
        return format(this.value, 0)
    }
}

export class Health extends Stat {
    current: number
    constructor(base = BASESTATS.health) {
        super(base);
        this.current = this.value;
    }

    checkBoundary():void {
        this.current = Math.min(this.current, this.value)
        if (this.current < 0) {
            this.current = this.value
            console.log("You've DIED. Note: Implement Death!")
        }
    }

    heal(n: number):void {
        this.current += n
        this.checkBoundary();
    }

    takeDamage(n:number):void {
        this.heal(-n);
    }

    displayCurrentHealth():string {
        return format(this.current, 0)
    }

    updateStat():void {
        let health = 0;
        const base = BASESTATS.health;
        const skill = player.skills.idling.computeStatIncrease();
        for (const boost of [base, skill]) {
            health += boost
        }
        this.value = health;
        this.checkBoundary();
    }
}
import { format } from "../utility"
export abstract class Stat {
    value: number
    constructor() {
        this.updateStat();
    }
    abstract updateStat():void

    displayStat():string {
        return format(this.value, 0)
    }
}

export class Health extends Stat {
    current: number
    constructor() {
        super();
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
        const base = 100;
        const skill = 100;
        for (const boost of [base, skill]) {
            health += boost
        }
        this.value = health;
        this.checkBoundary();
    }
}
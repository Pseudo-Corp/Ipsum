
export class Currency {
    cash: number
    limit: number

    

    constructor(initialMoney: number, initialLimit = Math.pow(10, 9) - 1) {
        this.cash = initialMoney
        this.limit = initialLimit
    };

    set(amount: number): void {
        this.cash = amount;
    };

    earn(amount: number):void {
        this.cash += amount;
    };

    spend(amount: number):void {
        if (this.canSpend(amount))
            this.earn(-amount);
        // TODO: Deal with the else case.
    };

    canSpend(cost: number):boolean {
        return this.cash >= cost; 
    };

    generateInterest(interestRate: number):void {
        this.cash *= (1 + interestRate);
    };
}
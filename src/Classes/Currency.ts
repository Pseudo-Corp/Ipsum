interface CurrencyOptions {
    allowNegative: boolean;
}

export class Currency {
    static MAX = 2 ** 53 - 1;

    constructor(
        public amount: number,
        public options: CurrencyOptions = {
            allowNegative: false,
        }
    ) {
        this.amount = amount;
        this.options = options;
    }

    public add(amount: number): Currency {
        const added = this.amount + amount;

        if (!Number.isSafeInteger(added)) {
            this.amount = Currency.MAX;
        } else {
            this.amount = added;
        }

        return this;
    }

    public sub(amount: number): Currency {
        const sub = this.amount - amount;

        if (!this.options.allowNegative && sub < 0) {
            this.amount = 0;
        } else {
            this.amount = sub;
        }

        return this;
    }
}

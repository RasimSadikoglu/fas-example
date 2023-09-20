export default class BetterDate {
    private _date: Date;
    get date() {
        return new Date(this._date);
    }

    private constructor(date: Date) {
        this._date = date;
    }

    public static current(): BetterDate {
        return new BetterDate(new Date());
    }

    public static fromDate(date: Date): BetterDate {
        return new BetterDate(date);
    }

    public static fromString(date: string): BetterDate {
        return new BetterDate(new Date(date));
    }

    public addDays(days: number): BetterDate {
        const date = this.date;

        date.setDate(date.getDate() + days);

        return BetterDate.fromDate(date);
    }

    public formatDate(/* format */): string {
        return this._date.toISOString().split('T')[0];
    }
}

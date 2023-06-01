export class Uteis {
    public static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static parseToBoolean(value: any) {
        return (/true/i).test(value);
    }
}
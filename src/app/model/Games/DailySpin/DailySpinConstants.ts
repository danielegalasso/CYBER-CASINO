export class DailySpinConstants {
    static readonly elements: string[] = [
        "Niente",
        "Bonus 5€",
        "Bonus 10€",
        "Bonus 7€",
        "Bonus 1€",
        "Bonus 20€",
        "Bonus 3€",
        "Bonus 50€",
        "Bonus 500€",
    ];

    static readonly valueIndexMap: Map<number, number> = new Map<number, number>([
        [0, 0],
        [5, 1],
        [10, 2],
        [7, 3],
        [1, 4],
        [20, 5],
        [3, 6],
        [50, 7],
        [500, 8]
    ]);
} 
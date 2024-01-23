export function getRandomInteger({ min = 1, max = 10 }: { min?: number, max?: number }): number {
    const number = Math.floor(Math.random() * Math.floor(max));

    return min > number ? min : number;
}
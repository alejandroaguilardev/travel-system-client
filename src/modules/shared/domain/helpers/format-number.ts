type InputValue = number;

export function fCurrency(number: InputValue): string {
    if (typeof number !== 'number') {
        return 'Invalid input';
    }

    const roundedNumber: number = Math.round(number * 100) / 100;

    const [integerPart, decimalPart]: string[] = roundedNumber.toString().split('.');

    const formattedInteger: string = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const formattedCurrency: string = `$${formattedInteger}.${decimalPart || '00'}`;

    return formattedCurrency;
}

export function fData(number: InputValue) {
    if (!number) return '';

    const numericValue = Number(number);
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    let i = 0;
    let value = numericValue;
    while (value >= 1024) {
        value /= 1024;
        i += 1;
    }


    return `${value.toFixed(1)} ${units[i]}`;
}



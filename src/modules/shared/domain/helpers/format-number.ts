type InputValue = number;

export function fCurrency(number: InputValue): string {
    if (typeof number !== 'number') {
        // Manejar el caso en que la entrada no sea un número
        return 'Invalid input';
    }

    // Redondear a dos decimales
    const roundedNumber: number = Math.round(number * 100) / 100;

    // Separar la parte entera y decimal
    const [integerPart, decimalPart]: string[] = roundedNumber.toString().split('.');

    // Formatear la parte entera con separadores de miles
    const formattedInteger: string = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Construir la cadena de moneda formateada
    const formattedCurrency: string = `$${formattedInteger}.${decimalPart || '00'}`;

    return formattedCurrency;
}


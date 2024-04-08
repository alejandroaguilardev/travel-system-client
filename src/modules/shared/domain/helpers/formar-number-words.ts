
export const numberToWords = (number: number): string => {
    const units: string[] = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const specials: string[] = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const tens: string[] = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas: string[] = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (number === 0) return "cero"

    const convertirGrupo = (num: number): string => {
        let numStr = '';
        if (num < 10) {
            numStr = units[num];
        } else if (num < 20) {
            numStr = specials[num - 10];
        } else if (num < 100) {
            const decena = Math.floor(num / 10);
            const unidad = num % 10;
            numStr = tens[decena];
            if (unidad !== 0) numStr += ' y ' + units[unidad];
        } else {
            const centena = Math.floor(num / 100);
            const resto = num % 100;
            numStr = centenas[centena];
            if (resto !== 0) numStr += ' ' + convertirGrupo(resto);
        }
        return numStr;
    }

    const millones = Math.floor(number / 1000000);
    const miles = Math.floor((number % 1000000) / 1000);
    const resto = number % 1000;

    let resultado = '';

    if (millones > 0) {
        resultado += convertirGrupo(millones) + ' millones ';
    }

    if (miles > 0) {
        resultado += convertirGrupo(miles) + ' mil ';
    }

    if (resto > 0) {
        resultado += convertirGrupo(resto);
    }

    return resultado.trim();
}

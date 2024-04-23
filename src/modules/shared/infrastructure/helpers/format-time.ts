import dayjs, { } from 'dayjs';
import 'dayjs/locale/es';

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'DD MMMM YYYY';
    return date ? dayjs(date).locale('es').format(fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'DD MMMM YYYY h:mm a';
    return date ? dayjs(date).locale('es').format(fm) : '';
}

export function fTimestamp(date: InputValue) {
    return date ? dayjs(date).valueOf() : '';
}

export function fDateTimeLong(date: InputValue, newFormat?: string): string {
    const fm = newFormat || "dddd, D MMMM YYYY [at] h:mm a";
    return date ? dayjs(date).locale('es').format(fm) : '';
}

export function fDayjs(date: InputValue): any {
    return dayjs(date)
}

export function fDayRest(date: InputValue, year: number, day: number, format = 'DD MMMM YYYY') {
    return dayjs(date).subtract(year, 'year').subtract(day, 'day').format(format);
}

export function fDaySum(date: InputValue, cant: number, format = 'DD MMMM YYYY') {
    return dayjs(date).add(cant, "D").format(format);
}

export function fDayDiffString(date: InputValue) {
    const dateNow = dayjs(new Date()).locale("es");
    const dateFormat = fDate(date, 'M/D/YYYY');
    const diff = dateNow.diff(dateFormat, 'month');
    const years = Math.floor(diff / 12);
    const month = diff % 12;
    if (years) {
        if (month > 0) {
            return `${years} años y ${month} meses`;
        }
        return `${years} años`;
    }

    return `${month} meses`;
};


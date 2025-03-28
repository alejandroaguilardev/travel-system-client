import dayjs, { ManipulateType } from 'dayjs';
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
    return dayjs(date).locale('es')
}

export function fDayRest(date: InputValue, year: number, day: number): Date {
    return dayjs(date).subtract(year, 'year').subtract(day, 'day').toDate();
}

export function fDaySum(date: InputValue, cant: number, unit: ManipulateType = "day"): Date {
    return dayjs(date).add(cant, unit).toDate();
}

export function fDayDiffDays(date1: InputValue, date2: InputValue) {
    return Math.floor((dayjs(date1).diff(dayjs(date2)) / 1000) / (60 * 60 * 24));
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


export function fMonthDiffText(date: InputValue): string {
    const dateNow = dayjs().locale("es");
    const diffMonths = dateNow.diff(dayjs(date), 'month');

    if (diffMonths === 1) {
        return "al mes";
    } else if (diffMonths > 1) {
        return `a los ${diffMonths} meses`;
    }
    return "menos de un mes";
}

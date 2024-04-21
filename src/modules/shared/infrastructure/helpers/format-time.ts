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


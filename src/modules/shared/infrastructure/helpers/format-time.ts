import { format, getTime, formatDistanceToNow, isToday, isPast } from 'date-fns';
import { es } from 'date-fns/locale';

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy';
    return date ? format(new Date(date), fm, { locale: es }) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
    const fm = newFormat || 'dd MMM yyyy p';
    return date ? format(new Date(date), fm, { locale: es }) : '';
}

export function fTimestamp(date: InputValue) {
    return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
    return date
        ? formatDistanceToNow(new Date(date), {
            locale: es,
            addSuffix: true,
        })
        : '';
}

export const getLabelColor = (dateReserved: string | number | Date | undefined) => {
    if (!dateReserved) return 'background.default';

    const reservationDate = new Date(dateReserved);
    if (isToday(reservationDate)) {
        return 'success.main';
    }
    if (isPast(reservationDate)) {
        return 'error.main';
    }
    return 'info.main';
};

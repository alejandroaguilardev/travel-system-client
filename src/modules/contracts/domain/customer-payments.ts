export interface CustomerPayment {
    price: number;
    date: Date;
    method: string;
}

export const customerPaymentSaldo = (price = 0, customerPayments?: CustomerPayment[]): number => {
    const saldo = customerPayments?.reduce((value, customerPayment) => {
        return value + customerPayment?.price ?? 0;
    }, 0) ?? 0;

    return price - saldo;
}


export const METHODS_PAYMENTS = [
    "Efectivo en soles",
    "Efectivo en dólares",
    "POS",
    "Transferencia bancaria",
    "Yape",
    "Western Union",
    "PayPal",
    "Transferencia internacional",
];



export const validateTotalOrCancelPay = (customerPayments: CustomerPayment[] = []): boolean => {
    if (customerPayments.length > 0) return true;

    return false;
}

export const validateParcialPay = (isPay: boolean = false): boolean => {
    if (isPay) return true;
    return false;
}
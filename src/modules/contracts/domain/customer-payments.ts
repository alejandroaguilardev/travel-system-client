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


export const METHODS_PAYMENTS = ["Efectivo", "Pos", "Transferencia", "Wester"];



export const validateCancelPay = (isPay: boolean = false, customerPayments: CustomerPayment[] = []): boolean => {
    if (isPay) return true;
    if (customerPayments.length > 0) return true;
    return false;
}
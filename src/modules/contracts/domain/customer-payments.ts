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
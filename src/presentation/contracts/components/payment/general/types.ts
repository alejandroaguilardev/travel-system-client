import { CustomerPayment } from '../../../../../modules/contracts/domain/customer-payments';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';

export interface HandlePayOrCancelButton {
    index: number;
    price: number;
    isPay: boolean;
    customerPayments: CustomerPayment[];
}

export interface HandlePayParcialButton {
    index: number;
    payInInstallment: PayInInstallment;
}


export interface ConfirmPayTotal {
    isPay: boolean;
    index: number;
    price: number;
    customerPayments: CustomerPayment[];
}

export interface PayInInstallmentSelected {
    index: number,
    payInInstallment: PayInInstallment;
}
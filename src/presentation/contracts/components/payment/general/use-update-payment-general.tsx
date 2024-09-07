import { useState } from 'react';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { customerPaymentSaldo } from 'src/modules/contracts/domain/customer-payments';
import { useMessage } from 'src/hooks';
import { METHODS_PAYMENTS, validateCancelPay } from '../../../../../modules/contracts/domain/customer-payments';


export const useUpdatePaymentGeneral = (
    payInInstallments: PayInInstallment[],
    onChangeValues: (updatedPayInInstallments: PayInInstallment[]) => void
) => {

    const { showNotification } = useMessage();
    const [dateCustomer, setDate] = useState(new Date());
    const [priceCustomer, setPriceCustomer] = useState(0);
    const [methodPayment, setMethodPayment] = useState(METHODS_PAYMENTS[0]);


    const handlePayTotalOrCancel = (index: number, saldo: number) => {
        const updatedPayInInstallments = [...payInInstallments];
        const isCancel = validateCancelPay(updatedPayInInstallments[index]?.isPay, updatedPayInInstallments[index]?.customerPayments);

        if (!isCancel) {
            updatedPayInInstallments[index].isPay = true;
            updatedPayInInstallments[index].customerPayments?.push({ date: new Date(), method: methodPayment, price: saldo });
        } else {
            updatedPayInInstallments[index].isPay = false;
            updatedPayInInstallments[index].customerPayments = [];
        }
        onChangeValues(updatedPayInInstallments);
    }

    const handlePayParcial = (index: number, payInInstallment: PayInInstallment): boolean => {
        if (payInInstallment.isPay) {
            showNotification("La cuota ya esta pagada", { variant: "info" });
            return false;
        }
        const saldo = customerPaymentSaldo(payInInstallment?.price, payInInstallment?.customerPayments)
        const price = priceCustomer > saldo ? saldo : priceCustomer;


        const updatedPayInInstallments = [...payInInstallments];
        updatedPayInInstallments[index].customerPayments?.push({
            date: dateCustomer,
            price,
            method: methodPayment,
        });

        if (price === saldo) {
            updatedPayInInstallments[index].isPay = true;
        }
        onChangeValues(updatedPayInInstallments);
        return true;
    }


    return {
        dateCustomer,
        priceCustomer,
        methodPayment,
        setMethodPayment,
        setPriceCustomer,
        setDate,
        handlePayTotalOrCancel,
        handlePayParcial,
    }

}
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { customerPaymentSaldo } from 'src/modules/contracts/domain/customer-payments';
import { CustomerPayment } from '../../../../../modules/contracts/domain/customer-payments';
import { useMessage } from 'src/hooks';


export const useUpdatePaymentGeneral = () => {
    const { showNotification } = useMessage();
    const [dateCustomer, setDate] = useState(new Date());
    const [priceCustomer, setPriceCustomer] = useState(0);
    const { setValue, watch } = useFormContext();
    const payInInstallments: PayInInstallment[] = watch("payInInstallments") ?? [];


    const handleIsPay = (index: number, saldo: number) => {
        const updatedPayInInstallments = [...payInInstallments];
        updatedPayInInstallments[index].isPay = !updatedPayInInstallments[index].isPay;

        if (updatedPayInInstallments[index].isPay) {
            updatedPayInInstallments[index].customerPayments?.push({ date: new Date(), method: "", price: saldo });
        } else {
            updatedPayInInstallments[index].customerPayments = [];
        }
        setValue("payInInstallments", updatedPayInInstallments);
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
            method: ""
        });

        if (price === saldo) {
            updatedPayInInstallments[index].isPay = true;
        }
        setValue("payInInstallments", updatedPayInInstallments);
        return true;
    }

    return {
        dateCustomer,
        priceCustomer,
        payInInstallments,
        setPriceCustomer,
        setDate,
        handleIsPay,
        handlePayParcial
    }

}
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { fDaySum, fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';

const payInInstallmentInit: PayInInstallment = {
    price: 0,
    percentage: 0,
    date: fDayjs(new Date()),
    customerPayments: [],
    isPay: false,
}

export const useContractFormPrices = () => {
    const { setValue, watch } = useFormContext();
    const payInInstallments: PayInInstallment[] = watch("payInInstallments") ?? payInInstallmentInit;
    const estimatedDate = watch("estimatedDate") || null;
    const hasSendEmail = watch("hasSendEmail") || false;
    const isEdit = watch("isEdit") || false;

    const priceTotal = watch("price");

    const [counter, setCounter] = useState(payInInstallments?.length || 1);

    const handleCounter = (value: number) => {
        const updatePayInInstallments: PayInInstallment[] = []
        Array.from({ length: value }, (_, index) => {
            if (payInInstallments?.[index]) {
                updatePayInInstallments.push({
                    ...payInInstallments[index],
                    date: fDaySum(payInInstallmentInit.date, index, "M"),
                    percentage: 100 / value,
                    price: priceTotal / value
                });
            } else {
                updatePayInInstallments.push({
                    ...payInInstallmentInit,
                    date: fDaySum(payInInstallmentInit.date, index, "M"),
                    percentage: 100 / value,
                    price: priceTotal / value
                });
            }
        })
        setCounter(value);
        setValue("payInInstallments", updatePayInInstallments);

    };

    const handlePercentageChange = (value: number, index: number, array: PayInInstallment[]) => {
        array[index].percentage = value;
        array[index].price = (priceTotal * value) / 100

        setValue("payInInstallments", array);
    };

    const handleCuotaChange = (value: number, index: number, array: PayInInstallment[]) => {
        array[index].price = value;

        array[index].percentage = (value / priceTotal) * 100;

        setValue("payInInstallments", array);

    };

    const onChangeHasSendEmail = () => {
        setValue("hasSendEmail", !hasSendEmail);

    }

    return {
        isEdit,
        hasSendEmail,
        priceTotal,
        counter,
        payInInstallments,
        estimatedDate,
        handleCounter,
        handlePercentageChange,
        handleCuotaChange,
        onChangeHasSendEmail
    }
}

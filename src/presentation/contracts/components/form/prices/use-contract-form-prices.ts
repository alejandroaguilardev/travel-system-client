import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';

const payInInstallmentInit: PayInInstallment = {
    price: 0,
    percentage: 0,
    date: fDayjs(new Date()),
}

export const useContractFormPrices = () => {
    const { setValue, watch } = useFormContext();
    const payInInstallments: PayInInstallment[] = watch("payInInstallments") ?? [];
    const [isPayInstallments, setIsPayInstallments] = useState(payInInstallments.length > 1);

    const priceTotal = watch("price");

    const [counter, setCounter] = useState(payInInstallments.length);

    const handleIsPayInstallments = () => {
        const value = !isPayInstallments;
        setValue("payInInstallments", []);
        setIsPayInstallments(value);
        if (value) {
            handleCounter(2)
        }
    }

    const handleCounter = (value: number) => {
        const updatePayInInstallments: PayInInstallment[] = []
        Array.from({ length: value }, (_, index) => {
            if (payInInstallments?.[index]) {
                updatePayInInstallments.push({
                    ...payInInstallments[index],
                    percentage: 100 / value,
                    price: priceTotal / value
                });
            } else {
                updatePayInInstallments.push({
                    ...payInInstallmentInit,
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

    return {
        counter,
        priceTotal,
        payInInstallments,
        isPayInstallments,
        handleIsPayInstallments,
        handleCounter,
        handlePercentageChange,
        handleCuotaChange
    }
}

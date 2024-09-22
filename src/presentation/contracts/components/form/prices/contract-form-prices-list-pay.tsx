import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { ConfirmPayTotal, PayInInstallmentSelected } from '../../payment/general/types';
import { DialogsUpdatePaymentGeneral } from '../../payment/dialogs-update-payment-general';
import { validateTotalOrCancelPay } from '../../../../../modules/contracts/domain/customer-payments';
import { useContextDialog } from '../../../../../components/dialog-context/dialog-context-generic';
import { useBoolean } from '../../../../../hooks/use-boolean';
import { useSelectedValue } from '../../../../../hooks/use-selected-value';

type Props = {
    index: number;
    payInInstallment: PayInInstallment;
    payInInstallments: PayInInstallment[],
}

export const ContractFormPricesListPay = ({ index, payInInstallments, payInInstallment }: Props) => {
    const { setValue } = useFormContext();
    const { openDialog } = useContextDialog();
    const { onFalse, onTrue, value } = useBoolean();

    const [payValues, setPayValues] = useState<ConfirmPayTotal | null>(null);
    const { selected, handleSelected } = useSelectedValue<PayInInstallmentSelected>();


    const onChangePayInInstallments = (updatePayInInstallments: PayInInstallment[]) => {
        setValue('payInInstallments', updatePayInInstallments);
    }


    const onOpenPayOrCancelButton = ({ isPay, index, price, customerPayments }: ConfirmPayTotal) => {
        setPayValues({ isPay, index, price, customerPayments });
        openDialog();
    }

    const handleClose = () => {
        handleSelected(null);
        setPayValues(null);
        onFalse();
    }


    return (
        <>
            <Button variant='contained'
                color={validateTotalOrCancelPay(payInInstallment?.customerPayments) ? "error" : "primary"}
                sx={{ mr: 1, minWidth: 150 }}
                onClick={() => onOpenPayOrCancelButton({
                    index,
                    price: payInInstallment.price,
                    isPay: payInInstallment.isPay,
                    customerPayments: payInInstallment?.customerPayments ?? []
                })}
            >
                {validateTotalOrCancelPay(payInInstallment?.customerPayments)
                    ? "Cancelar Pago"
                    : "Pago total"}
            </Button>
            {

            }
            <Button variant='outlined'
                color={payInInstallment.isPay ? 'info' : 'success'}
                sx={{ mr: 1, minWidth: 150 }}
                onClick={() => {
                    handleSelected({ payInInstallment, index })
                    setPayValues(null);
                    onTrue();
                }
                }>
                {payInInstallment.isPay ? "Listar Pago" : "Pago Parcial"}
            </Button>
            <DialogsUpdatePaymentGeneral
                payValues={payValues}
                isOpen={value}
                handleClose={handleClose}
                index={selected?.index}
                payInInstallments={payInInstallments}
                payInInstallment={selected?.payInInstallment}
                onChangePayInInstallments={onChangePayInInstallments}
            />
        </>
    )
}

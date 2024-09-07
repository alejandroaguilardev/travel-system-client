import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { useSelectedValue } from '../../../../../hooks/use-selected-value';

import { useState } from 'react';
import { TableUpdatePaymentGeneral } from './table-update-payment-general';
import { ConfirmPayTotal, PayInInstallmentSelected } from './types';
import { useContextDialog } from '../../../../../components/dialog-context/dialog-context-generic';
import { DialogsUpdatePaymentGeneral } from '../dialogs-update-payment-general';
import { useBoolean } from 'src/hooks';


type Props = {
    payInInstallments: PayInInstallment[];
    onChangePayInInstallments: (updatedPayInInstallments: PayInInstallment[]) => void;
}

export const UpdatePaymentGeneral = ({ payInInstallments, onChangePayInInstallments }: Props) => {
    const { openDialog } = useContextDialog();
    const { onFalse, onTrue, value } = useBoolean();

    const [payValues, setPayValues] = useState<ConfirmPayTotal | null>(null);
    const { selected, handleSelected } = useSelectedValue<PayInInstallmentSelected>();

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
            <TableUpdatePaymentGeneral
                payInInstallments={payInInstallments}
                onOpenPayOrCancelButton={onOpenPayOrCancelButton}
                handleSelected={({ payInInstallment: PayInInstallment, index: number }) => {
                    handleSelected({ payInInstallment: PayInInstallment, index: number });
                    onTrue();
                }}
            />
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


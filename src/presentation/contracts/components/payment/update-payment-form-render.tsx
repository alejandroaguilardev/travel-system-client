import { ActionsButtonsForm } from "src/components/hook-form/actions-buttons-form";
import { Contract } from "src/modules/contracts/domain/contract";
import { UpdatePaymentGeneral } from "./general/update-payment-general";
import { useFormContext } from "react-hook-form";
import { PayInInstallment } from '../../../../modules/contracts/domain/payment-summary';

interface Props {
    contract: Contract;
    onCancel: () => void;
}

export const UpdatePaymentFormRender = ({ contract, onCancel }: Props) => {
    const { setValue, watch } = useFormContext();
    const payInInstallments: PayInInstallment[] = watch("payInInstallments") ?? [];

    return (
        <>
            <UpdatePaymentGeneral
                payInInstallments={payInInstallments}
                onChangePayInInstallments={(updatedPayInInstallments: PayInInstallment[]) => setValue("payInInstallments", updatedPayInInstallments)}
            />

            <ActionsButtonsForm
                name="Pagos"
                edit={!!contract}
                fullWidth
                notReload
                onCancel={onCancel}
            />
        </>
    )
}

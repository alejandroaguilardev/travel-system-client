import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { ActionsButtonsForm } from "src/components/hook-form/actions-buttons-form";
import { useMessage } from "src/hooks";
import { Contract } from "src/modules/contracts/domain/contract";
import { errorsShowNotification } from "src/modules/shared/infrastructure/helpers/errors-show-notification";
import { contractPaymentsSchema, defaultValues } from "./payment-validations";
import { ContractPayments } from '../../../../modules/contracts/domain/contract';
import { paymentUpdater } from '../../../../modules/contracts/application/update/payment-updater';
import { contractService } from '../../../../modules/contracts/infrastructure/contract.service';
import uuid from '../../../../modules/shared/infrastructure/adapter/uuid';
import FormProvider from "../../../../components/hook-form/form-provider";
import { UpdatePaymentGeneral } from "./general/update-payment-general";

interface Props {
    contract: Contract;
    setLoading: (isLoading: boolean) => void;
    callback: () => void;
    onCancel: () => void;
}

export const UpdatePaymentForm = ({ contract, callback, setLoading, onCancel }: Props) => {
    const { showSuccess, showNotification } = useMessage();

    const methods = useForm({
        resolver: yupResolver<ContractPayments>(contractPaymentsSchema),
        defaultValues: {
            ...defaultValues,
            payInInstallments: contract.payInInstallments?.map(payInInstallment => ({
                price: payInInstallment.price,
                percentage: payInInstallment.percentage,
                date: payInInstallment.date,
                isPay: payInInstallment.isPay,
                customerPayments: payInInstallment?.customerPayments?.map((customerPayment) => ({
                    price: customerPayment.price,
                    date: customerPayment.date,
                    method: customerPayment.method,
                })) ?? [],
            }))
        }
    });


    const onSubmit: SubmitHandler<ContractPayments> = async (data) => {
        setLoading(true);
        try {
            const { message } = await paymentUpdater(contractService, uuid)(contract.id, data)

            showSuccess({ newTitle: message });
            callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        } finally {
            setLoading(false);
        }
    };


    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <UpdatePaymentGeneral />
            <ActionsButtonsForm
                name="Pagos"
                edit={!!contract}
                fullWidth
                notReload
                onCancel={onCancel}
            />
        </FormProvider>
    )
}

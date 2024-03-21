import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMessage } from '../../../../hooks';
import { Contract } from '../../../../modules/contracts/domain/contract';
import FormProvider from '../../../../components/hook-form/form-provider';
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { AssignPetFormGeneral } from './assign-pet-form-general';
import { petSchema } from '../../../../presentation/pets/components/form/pet-validations';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';
import { ContractPetUpdaterInterface, contractPetUpdater } from '../../../../modules/contracts/application/update/contract-pet-updater';
import { contractDetailService } from '../../../../modules/contracts/infrastructure/contract-detail.service';


export interface ContractPetObjectSchema {
    details: ContractPetUpdaterInterface[],
    client: string
}

const contractSchema: Yup.ObjectSchema<ContractPetObjectSchema> = Yup.object().shape({
    details: Yup.array().of(Yup.object().shape({
        id: Yup.string().required("Debe indicar el identificador  del detalle del contrato"),
        pet: petSchema,
    })).required("Debe indicar las mascotas"),
    client: Yup.string().required("Debe indicar el número del contrato"),
});

interface Props {
    contract: Contract;
    contractDetails: ContractDetail[]
    setLoading: (isLoading: boolean) => void;
    callback: () => void;
    onCancel: () => void;
}

export const AssignPetForm = ({ contract, contractDetails, callback, setLoading, onCancel }: Props) => {
    const { showSuccess, showNotification } = useMessage();

    const methods = useForm({
        resolver: yupResolver<ContractPetObjectSchema>(contractSchema),
        defaultValues: {
            client: contract.client.id!,
            details: contractDetails?.map(({ id, pet }) => ({ pet, id })) || []
        },
    });


    const onSubmit: SubmitHandler<ContractPetObjectSchema> = async ({ details }) => {
        setLoading(true);
        try {
            const { message } = await contractPetUpdater(contractDetailService)(contract.id, details)

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
            <AssignPetFormGeneral />
            <ActionsButtonsForm
                name="contrato"
                edit={!!contract}
                fullWidth
                notReload
                onCancel={onCancel}
            />
        </FormProvider>
    )
}



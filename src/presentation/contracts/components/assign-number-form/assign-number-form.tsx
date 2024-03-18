import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, } from '@mui/material';
import { useMessage } from '../../../../hooks';
import { Contract } from '../../../../modules/contracts/domain/contract';
import FormProvider from '../../../../components/hook-form/form-provider';
import { AssignNumberFormGeneral } from './assign-number-form-general';
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { contractService } from '../../../../modules/contracts/infrastructure/contract.service';
import { FolderUpdater } from '../../../../modules/contracts/application/update/folder-updater';

interface ObjectSchema {
    folder: string,
    number: string
}

const contractSchema: Yup.ObjectSchema<ObjectSchema> = Yup.object().shape({
    folder: Yup.string().required("Debe indicar el folder del contrato"),
    number: Yup.string().required("Debe indicar el número del contrato"),

});

interface Props {
    contract: Contract;
    setLoading: (isLoading: boolean) => void;
    callback: () => void;
    onCancel: () => void;
}

export const AssignNumberForm = ({ contract, callback, setLoading, onCancel }: Props) => {
    const { showSuccess, showNotification } = useMessage();
    const methods = useForm({
        resolver: yupResolver<ObjectSchema>(contractSchema),
        defaultValues: {
            folder: contract?.folder ?? "",
            number: contract?.number ?? "",
        },
    });


    const onSubmit: SubmitHandler<ObjectSchema> = async ({ folder, number }) => {
        setLoading(true);
        try {
            const { message } = await FolderUpdater(contractService)(contract.id, folder, number)

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
            <Box display="flex" flexDirection="column" gap={1} my={1}>
                <AssignNumberFormGeneral />
                <ActionsButtonsForm
                    name="contrato"
                    edit={!!contract}
                    fullWidth
                    notReload
                    onCancel={onCancel}
                />
            </Box>
        </FormProvider>
    )
}



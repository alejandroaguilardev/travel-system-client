import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CageDefinition } from '../../../../../modules/contracts/domain/interfaces/cage';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from "@mui/material";
import { useFormCage } from "./use-form-cage";
import { cageSchema } from "./cage-validation";
import { CageFormGeneral } from './cage-form-general';

type Props = {
    contractId: string
    cage: CageDefinition;
    readonly: boolean;
    onCancel: () => void;
}

export const CageForm: FC<Props> = ({ cage, onCancel, readonly, contractId }) => {
    const methods = useForm({
        resolver: yupResolver<CageDefinition>(cageSchema),
        defaultValues: cage,
    });

    const { onSubmit } = useFormCage({ contractId, callback: onCancel });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >

            <CageFormGeneral readonly={readonly} />

            {!readonly &&
                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        Actualizar
                    </Button>
                </Box>
            }
        </FormProvider >
    )
}

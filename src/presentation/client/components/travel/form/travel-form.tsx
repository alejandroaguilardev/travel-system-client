import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from "@mui/material";
import { useFormTravel } from "./use-form-travel";
import { travelSchema } from "./travel-validation";
import { TravelFormGeneral } from './general/travel-form-general';
import { PartialTravel, Travel } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';

type Props = {
    contractId: string
    travel: Travel;
    readonly: boolean;
    onCancel: () => void;
    user?: boolean;
}

export const TravelForm: FC<Props> = ({ travel, onCancel, user, readonly, contractId }) => {
    const methods = useForm({
        resolver: yupResolver<PartialTravel>(travelSchema),
        defaultValues: travel,
    });

    const { onSubmit } = useFormTravel({ contractId, callback: onCancel });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            <TravelFormGeneral readonly={readonly} user={user} />

            {(!readonly || user) &&
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

import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PartialTravelDefinition, TravelDefinition } from '../../../../../modules/contracts/domain/interfaces/travel';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from "@mui/material";
import { useFormTravel } from "./use-form-travel";
import { travelSchema } from "./travel-validation";
import { TravelFormGeneral } from './travel-form-general';

type Props = {
    contractId: string
    travel: TravelDefinition;
    readonly: boolean;
    onCancel: () => void;
}

export const TravelForm: FC<Props> = ({ travel, onCancel, readonly, contractId }) => {
    const methods = useForm({
        resolver: yupResolver<PartialTravelDefinition>(travelSchema),
        defaultValues: travel,
    });

    const { onSubmit } = useFormTravel({ contractId, callback: onCancel });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            <TravelFormGeneral readonly={readonly} />

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

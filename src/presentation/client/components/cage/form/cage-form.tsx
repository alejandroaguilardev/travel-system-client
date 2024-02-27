import { FC, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Cage } from '../../../../../modules/contracts/domain/contract-services/cage/cage';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Alert, Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useFormCage } from "./use-form-cage";
import { cageSchema } from "./cage-validation";
import { CageFormGeneral } from './cage-form-general';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    contractId: string;
    detailId: string;
    cage: Cage;
    isRecommendation?: boolean;
    hasServiceIncluded: boolean;
    noShowButton: boolean;
    onCancel: () => void;
    callback: (response?: ContractDetailUpdateResponse) => void
    user?: boolean
}

export const CageForm: FC<Props> = ({ cage, onCancel, callback, hasServiceIncluded, detailId, contractId, user = false, noShowButton, isRecommendation = false }) => {
    const methods = useForm({
        resolver: yupResolver<Cage>(cageSchema),
        defaultValues: cage,
    });

    const [recommendation, setRecommendation] = useState(false);

    const { onSubmit } = useFormCage({ contractId, detailId, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            <CageFormGeneral
                hasServiceIncluded={hasServiceIncluded}
                user={user}
            />

            <Alert icon={false} variant='standard' severity="error" sx={{ width: "100%", mb: 2 }}>
                {isRecommendation &&
                    <FormControlLabel
                        control={<Checkbox onClick={() => setRecommendation(!recommendation)} />}
                        label=" Me comprometo a adquirir y utilizar esta jaula de forma adecuada."
                    />
                }
            </Alert>

            {(!noShowButton || user) &&
                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={(!recommendation && isRecommendation) || methods.formState.isSubmitting} fullWidth >
                        Actualizar
                    </Button>
                </Box>
            }
        </FormProvider >
    )
}

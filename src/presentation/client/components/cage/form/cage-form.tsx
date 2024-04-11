import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Cage } from '../../../../../modules/contracts/domain/contract-services/cage/cage';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Alert, Box, Button } from '@mui/material';
import { useFormCage } from "./use-form-cage";
import { cageSchema } from "./cage-validation";
import { CageFormGeneral } from './cage-form-general';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import RHFCheckbox from '../../../../../components/hook-form/rhf-checkbox';
import { CageChosen } from '../../../../../modules/contracts/domain/contract-services/cage/cage-chosen';
import { Pet } from '../../../../../modules/pets/domain/pet';

type Props = {
    contractId: string;
    detailId: string;
    pet: Pet;
    cage: Cage;
    cageRecommendation?: CageChosen;
    noShowButton: boolean;
    onCancel: () => void;
    callback: (response?: ContractDetailUpdateResponse) => void;
    user?: boolean;
}

export const CageForm: FC<Props> = ({ cageRecommendation, pet, cage, onCancel, callback, user = false, noShowButton, detailId, contractId }) => {
    const methods = useForm({
        resolver: yupResolver<Cage>(cageSchema),
        defaultValues: {
            ...cage,
            chosen: {
                dimensionsCage: cage?.chosen?.dimensionsCage || cageRecommendation?.dimensionsCage,
                modelCage: cage?.chosen?.modelCage || cageRecommendation?.modelCage,
                typeCage: cage?.chosen?.typeCage || cageRecommendation?.typeCage
            }
        },
    });


    const { onSubmit } = useFormCage({ contractId, detailId, callback });
    const confirmation = methods.watch("confirmation");
    const petTravelAcquisition = methods.watch("petTravelAcquisition");

    return (

        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            <CageFormGeneral pet={pet} />

            <Alert icon={false} variant='standard' severity={confirmation ? "success" : "error"} sx={{ width: "100%", p: 0, mb: 1 }}>
                <RHFCheckbox
                    name="confirmation"
                    label=" Me comprometo a adquirir y utilizar esta jaula de forma adecuada."
                    sx={{ px: 2 }}
                />
            </Alert>
            <Alert icon={false} variant='standard' severity={petTravelAcquisition ? "success" : "error"} sx={{ width: "100%", p: 0, mb: 2 }}>
                <RHFCheckbox
                    sx={{ px: 2 }}
                    name="petTravelAcquisition"
                    label="Adquisición de la Jaula a Través de Pet Travel"
                />
            </Alert>

            <Box display="flex" gap={1} justifyContent="center" mb={4}>
                <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                    Cancelar
                </Button>

                <Button type="submit" variant="contained" disabled={noShowButton || methods.formState.isSubmitting} fullWidth >
                    Actualizar
                </Button>
            </Box>
        </FormProvider >

    )
}

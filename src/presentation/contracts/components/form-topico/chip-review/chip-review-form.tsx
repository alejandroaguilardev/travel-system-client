import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { chipReviewContractObjectSchema, defaultChipReview } from "./chip-review-validation";
import { useFormChipReview } from "./use-form-chip-review";
import { ChipReviewContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { ChipReviewFormGeneral } from "./chip-review-form-general";

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const ChipReviewForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {
    const chipReview = detail?.topico?.chipReview;

    const methods = useForm({
        resolver: yupResolver<ChipReviewContract>(chipReviewContractObjectSchema),
        defaultValues: {
            executed: chipReview?.executed || defaultChipReview.executed,
            date: chipReview?.date || defaultChipReview.date,
            description: chipReview?.description || defaultChipReview.description,
            observation: chipReview?.observation || defaultChipReview.observation,
            user: chipReview?.user || defaultChipReview.user
        }
    });

    const { onSubmit, isExecuted } = useFormChipReview({ contractId, detailId: detail.id, callback });


    return (
        <>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                {!chipReview?.executed && !isExecuted && <Alert severity="error">Aùn no se ha guardado la revisión del microchip</Alert>}

                {chipReview?.executed && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

                {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}



                <ChipReviewFormGeneral />

                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        {chipReview?.executed ? "Actualizar Vacuna de Rabia" : "Guardar Vacuna de Rabia"}
                    </Button>

                </Box>
            </FormProvider >

        </>
    )
}

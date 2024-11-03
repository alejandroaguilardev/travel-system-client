import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { chipReviewContractObjectSchema, defaultChipReview } from "./chip-review-validation";
import { useFormChipReview } from "./use-form-chip-review";
import { ChipReviewContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { ChipReviewFormGeneral } from "./chip-review-form-general";
import { DatePicker } from "@mui/x-date-pickers";
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';

type Props = {
    contractId: string;
    detail: ContractDetail;
    hasShowReviewChip?: boolean;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const ChipReviewForm: FC<Props> = ({ detail, callback, hasShowReviewChip = false, contractId, onCancel }) => {
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

    const { onSubmit, isExecuted, chipDate, chip, setChip, setChipDate } = useFormChipReview({ contractId, detailId: detail.id, pet: detail.pet, callback });

    return (
        <>
            {(detail.topico?.chip.executed && ((detail.topico?.rabiesVaccination?.executed || detail.topico?.rabiesReVaccination?.executed)) && hasShowReviewChip) &&
                <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                    {!chipReview?.executed && !isExecuted && <Alert severity="error">Aùn no se ha guardado la revisión del microchip</Alert>}

                    {chipReview?.executed && !isExecuted && <Alert severity="info">Estos datos ya están guardados y enviados al cliente, sí cambias datos, debes darle click en actualizar</Alert>}

                    {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}
                    <ChipReviewFormGeneral />

                    <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                        <TextField
                            name="chip"
                            label="Chip"
                            value={chip}
                            onChange={(e) => setChip(e.target.value)}
                            fullWidth
                        />
                        <DatePicker
                            name="chipDate"
                            value={fDayjs(chipDate)}
                            label="Chip Fecha de instalación"
                            onChange={(e) => setChipDate(e)}
                            format='DD/MM/YYYY'
                            sx={{
                                width: "100%"
                            }}
                        />
                    </Stack>

                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            {chipReview?.executed ? "Actualizar Revisión de microchip" : "Guardar Revisión de microchip"}
                        </Button>

                    </Box>
                </FormProvider >
            }
            {!detail.topico?.chip?.executed && <Alert severity="error" sx={{ mb: 1 }}>Aùn no se ha guardado el microchip de la mascota</Alert>}
            {!hasShowReviewChip && <Alert severity="error" sx={{ mb: 1 }}>No es necesaria una revisión de microchip</Alert>}
            {(!detail.topico?.rabiesVaccination?.executed || !detail.topico?.rabiesReVaccination?.executed) && <Alert severity="error">Debe realizarse la vacunación de rabia primero</Alert>}



        </>
    )
}

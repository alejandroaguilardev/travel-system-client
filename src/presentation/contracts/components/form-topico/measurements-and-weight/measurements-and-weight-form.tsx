import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { useMeasurementsAndWeightForm } from "./use-measurements-and-weight-form";
import { MeasurementsAndWeightFormGeneral } from "./measurements-and-weight-form-general";
import { MeasurementsAndWeightFormSchema, measurementsAndWeightFormObjectSchema } from "./measurements-and-weight-validation";
import { Pet } from '../../../../../modules/pets/domain/pet';
import { SendEmailCheck } from '../../../../../components/send-email-check/send-email-check';

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: Pet) => void;
    onCancel: () => void;
}

export const MeasurementsAndWeightForm: FC<Props> = ({ detail, contractId, callback, onCancel }) => {
    const methods = useForm({
        resolver: yupResolver<MeasurementsAndWeightFormSchema>(measurementsAndWeightFormObjectSchema),
        defaultValues: {
            race: detail.pet?.race || "",
            gender: detail.pet?.gender || "male",
            color: detail.pet?.color || "",
            type: detail.pet?.type || "",
            sterilized: detail.pet?.sterilized || "No",
            measurementsAndWeight: detail?.pet?.measurementsAndWeight ?? {
                height: 0,
                length: 0,
                width: 0,
                weight: 0,
            },
            cageRecommendation: detail?.pet?.cageRecommendation ?? {
                dimensionsCage: "",
                modelCage: "",
                typeCage: ""
            },
        }
    });

    const { onSubmit, isExecuted, hasSendEmail, onChangeHasSendEmail } = useMeasurementsAndWeightForm({
        petId: detail.pet?.id ?? "",
        contractId,
        contractDetailId: detail.id,
        callback
    });

    return (
        <>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
                {(!detail?.pet?.measurementsAndWeight?.width && !isExecuted) ? <Alert severity="error">Recuerda actualizar la información, aún no se han guardado los cambios</Alert> : ""}

                {(detail?.pet?.measurementsAndWeight?.width && !isExecuted) ? <Alert severity="info"> Estos datos ya están guardados y enviados al cliente, sí cambias datos, debes darle click en actualizar</Alert> : ""}

                {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

                <MeasurementsAndWeightFormGeneral />
                <SendEmailCheck value={hasSendEmail} onChange={onChangeHasSendEmail} label="Enviar correo de notificación al cliente" />

                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        Actualizar
                    </Button>

                </Box>
            </FormProvider >

        </>
    )
}

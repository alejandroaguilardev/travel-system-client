import { FC, useState } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { useMeasurementsAndWeightForm } from "./use-measurements-and-weight-form";
import { MeasurementsAndWeightFormGeneral } from "./measurements-and-weight-form-general";
import { MeasurementsAndWeightFormSchema, measurementsAndWeightFormObjectSchema } from "./measurements-and-weight-validation";

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response?: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const MeasurementsAndWeightForm: FC<Props> = ({ detail, callback, onCancel }) => {

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

    const { onSubmit, isExecuted } = useMeasurementsAndWeightForm({ petId: detail.pet?.id ?? "", callback });

    return (
        <>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
                {isExecuted ?
                    <Alert severity="success">Guardado correctamente los cambios</Alert>
                    :
                    <Alert severity="error">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

                <MeasurementsAndWeightFormGeneral />

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

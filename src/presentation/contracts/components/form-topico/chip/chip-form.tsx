import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { chipObjectSchema, defaultChip } from "./chip-validation";
import { ChipContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { ChipFormGeneral } from "./chip-form-general";
import { useFormChip } from "./use-form-chip";
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';

type Props = {
    contractId: string;
    detail: ContractDetail;

    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const ChipForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {
    const chip = detail?.topico?.chip;
    const chipDefault = detail?.pet?.chip || defaultChip.description;

    const methods = useForm({
        resolver: yupResolver<ChipContract>(chipObjectSchema),
        defaultValues: {
            hasIncluded: chip?.hasIncluded || defaultChip.hasIncluded,
            executed: chip?.executed || defaultChip.executed,
            date: chip?.date || defaultChip.date,
            description: chip?.description || chipDefault,
            observation: chip?.observation || defaultChip.observation,
            user: chip?.user || defaultChip.user
        }
    });

    const { onSubmit, isExecuted } = useFormChip({ contractId, detail, petId: detail.pet?.id ?? "", callback, action: DOCUMENTATION_KEYS.chipCertificate });


    return (
        <>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >


                {!chip?.executed && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada al microchip</Alert>}

                {chip?.executed && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

                {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}


                <ChipFormGeneral />
                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        {chip?.executed ? "Actualizar Microchip" : "Guardar Microchip"}
                    </Button>

                </Box>
            </FormProvider >

        </>
    )
}

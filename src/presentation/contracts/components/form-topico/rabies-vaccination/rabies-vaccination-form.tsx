import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { rabiesVaccinationContractObjectSchema, defaultRabiesVaccination } from "./rabies-vaccination-validation";
import { useFormRabiesVaccination } from "./use-form-rabies-vaccination";
import { RabiesVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { RabiesVaccinationFormGeneral } from "./rabies-vaccination-form-general";

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const RabiesVaccinationForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {
    const rabiesVaccination = detail?.topico?.rabiesVaccination;

    const methods = useForm({
        resolver: yupResolver<RabiesVaccinationContract>(rabiesVaccinationContractObjectSchema),
        defaultValues: {
            hasIncluded: rabiesVaccination?.hasIncluded || defaultRabiesVaccination.hasIncluded,
            executed: rabiesVaccination?.executed || defaultRabiesVaccination.executed,
            date: rabiesVaccination?.date || defaultRabiesVaccination.date,
            description: rabiesVaccination?.description || defaultRabiesVaccination.description,
            observation: rabiesVaccination?.observation || defaultRabiesVaccination.observation,
            user: rabiesVaccination?.user || defaultRabiesVaccination.user
        }
    });

    const { onSubmit, isExecuted } = useFormRabiesVaccination({ contractId, detailId: detail.id, callback });


    return (
        <>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>

                {!rabiesVaccination?.executed && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada a la vacuna de rabia</Alert>}

                {rabiesVaccination?.executed && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

                {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}


                <RabiesVaccinationFormGeneral />

                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        {rabiesVaccination?.executed ? "Actualizar Vacuna de Rabia" : "Guardar Vacuna de Rabia"}
                    </Button>

                </Box>
            </FormProvider >

        </>
    )
}

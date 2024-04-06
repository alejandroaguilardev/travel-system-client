import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { rabiesReVaccinationContractObjectSchema, defaultRabiesReVaccination } from "./rabies-revaccination-validation";
import { useFormRabiesReVaccination } from "./use-form-rabies-revaccination";
import { RabiesReVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { RabiesReVaccinationFormGeneral } from "./rabies-revaccination-form-general";

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const RabiesReVaccinationForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {
    const rabiesReVaccination = detail?.topico?.rabiesReVaccination;

    const methods = useForm({
        resolver: yupResolver<RabiesReVaccinationContract>(rabiesReVaccinationContractObjectSchema),
        defaultValues: {
            executed: rabiesReVaccination?.executed || defaultRabiesReVaccination.executed,
            date: rabiesReVaccination?.date || defaultRabiesReVaccination.date,
            description: rabiesReVaccination?.description || defaultRabiesReVaccination.description,
            observation: rabiesReVaccination?.observation || defaultRabiesReVaccination.observation,
            user: rabiesReVaccination?.user || defaultRabiesReVaccination.user
        }
    });

    const { onSubmit, isExecuted } = useFormRabiesReVaccination({ contractId, detailId: detail.id, callback });


    return (
        <>
            {detail?.topico?.rabiesVaccination?.executed ?
                <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>

                    {!rabiesReVaccination?.executed && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada a la revacuna de rabia</Alert>}

                    {rabiesReVaccination?.executed && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

                    {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

                    <RabiesReVaccinationFormGeneral />

                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            {rabiesReVaccination?.executed ? "Actualizar Vacuna de Rabia" : "Guardar Vacuna de Rabia"}
                        </Button>

                    </Box>
                </FormProvider >
                : <Alert severity="error">Aùn no se ha guardado la vacuna de rabia en el sistema</Alert>
            }
        </>
    )
}

import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Divider } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { rabiesReVaccinationContractObjectSchema, defaultRabiesReVaccination } from "./rabies-revaccination-validation";
import { useFormRabiesReVaccination } from "./use-form-rabies-revaccination";
import { RabiesReVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { RabiesReVaccinationFormGeneral } from "./rabies-revaccination-form-general";
import { SendEmailCheck } from '../../../../../components/send-email-check/send-email-check';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';

type Props = {
    contractId: string;
    detail: ContractDetail;
    hasServiceIncluded?: boolean;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const RabiesReVaccinationForm: FC<Props> = ({ detail, callback, hasServiceIncluded = false, contractId, onCancel }) => {
    const rabiesReVaccination = detail?.topico?.rabiesReVaccination;

    const methods = useForm({
        resolver: yupResolver<RabiesReVaccinationContract>(rabiesReVaccinationContractObjectSchema),
        defaultValues: {
            hasIncluded: rabiesReVaccination?.hasIncluded || defaultRabiesReVaccination.executed,
            executed: rabiesReVaccination?.executed || defaultRabiesReVaccination.executed,
            date: rabiesReVaccination?.date || defaultRabiesReVaccination.date,
            description: rabiesReVaccination?.description || defaultRabiesReVaccination.description,
            observation: rabiesReVaccination?.observation || defaultRabiesReVaccination.observation,
            user: rabiesReVaccination?.user || defaultRabiesReVaccination.user
        }
    });

    const { onSubmit, isExecuted, hasSendEmail, expectedDate, handleExpectedDate, onChangeHasSendEmail } = useFormRabiesReVaccination({ contractId, detail, hasServiceIncluded, callback });


    return (
        <>
            {detail?.topico?.rabiesVaccination?.executed ?
                <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>

                    {!rabiesReVaccination?.executed && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada a la revacuna de rabia</Alert>}

                    {rabiesReVaccination?.executed && !isExecuted && <Alert severity="info">Estos datos ya están guardados y enviados al cliente, sí cambias datos, debes darle click en actualizar</Alert>}

                    {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

                    <RabiesReVaccinationFormGeneral />
                    <Divider />

                    <DateTimePicker
                        label="Fecha programada para la toma de muestra (*)"
                        onChange={(date) => handleExpectedDate(date)}
                        sx={{ width: "100%", my: 2, mb: 4 }}
                        format='DD/MM/YYYY HH:mm:ss'
                        value={fDayjs(expectedDate)}

                    />
                    <SendEmailCheck value={hasSendEmail} onChange={onChangeHasSendEmail} label="Enviar notificación al cliente por email y whatsApp" />

                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            {rabiesReVaccination?.executed ? "Actualizar Re Vacunación de Rabia" : "Guardar Re Vacunación de Rabia"}
                        </Button>

                    </Box>
                </FormProvider >
                : <Alert severity="error">Aùn no se ha guardado la vacuna de rabia en el sistema</Alert>
            }
        </>
    )
}

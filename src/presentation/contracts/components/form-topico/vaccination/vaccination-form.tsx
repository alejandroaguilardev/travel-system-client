import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { vaccinationContractObjectSchema, petVaccinationDefaultValues } from "./vaccination-validation";
import { useFormVaccination } from "./use-form-vaccination";
import { VaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { VaccinationFormGeneral } from "./vaccination-form-general";
import { SendEmailCheck } from '../../../../../components/send-email-check/send-email-check';
import { Contract } from '../../../../../modules/contracts/domain/contract';

type Props = {
    title: string;
    contract: Contract;
    detail: ContractDetail;
    hasServiceIncluded?: boolean;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const VaccinationForm: FC<Props> = ({ title, detail, hasServiceIncluded = false, contract, callback, onCancel }) => {
    const vaccination = detail?.topico?.vaccination;
    const contractId = contract.id;

    const methods = useForm({
        resolver: yupResolver<VaccinationContract>(vaccinationContractObjectSchema),
        defaultValues: petVaccinationDefaultValues(contract, detail)
    });

    const { onSubmit, isExecuted, hasSendEmail, onChangeHasSendEmail } = useFormVaccination({ contractId, detail, callback, hasServiceIncluded });


    return (
        <>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                {!hasServiceIncluded && !isExecuted && <Alert severity="error" sx={{ mb: 1 }}>Esta servicio no esta incluido en el contrato</Alert>}
                {hasServiceIncluded && !vaccination?.executed && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada a la vacuna</Alert>}

                {vaccination?.executed && !isExecuted && <Alert severity="info">Estos datos ya están guardados y enviados al cliente, sí cambias datos, debes darle click en actualizar</Alert>}

                {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

                <VaccinationFormGeneral title={title} pet={detail?.pet} hasServiceIncluded={hasServiceIncluded} />
                {hasServiceIncluded &&
                    <SendEmailCheck value={hasSendEmail} onChange={onChangeHasSendEmail} label="Enviar notificación al cliente por email y whatsApp" />
                }

                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    {
                        hasServiceIncluded &&
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            {vaccination?.executed ? "Actualizar Vacuna" : "Guardar Vacuna"}
                        </Button>
                    }

                </Box>
            </FormProvider >

        </>
    )
}

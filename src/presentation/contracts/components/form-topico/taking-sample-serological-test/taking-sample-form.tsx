import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { takingSampleContractObjectSchema, defaultTakingSampleSerologicalTestContract } from "./taking-sample-validation";
import { useFormTakingSampleSerologicalTestContract } from "./use-form-taking-sample";
import { TakingSampleSerologicalTestContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { TakingSampleSerologicalTestContractFormGeneral } from "./taking-sample-form-general";
import { SendEmailCheck } from '../../../../../components/send-email-check/send-email-check';

type Props = {
    contractId: string;
    detail: ContractDetail;
    hasServiceIncluded?: boolean;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const TakingSampleSerologicalTestContractForm: FC<Props> = ({ detail, callback, hasServiceIncluded, contractId, onCancel }) => {
    const takingSampleSerologicalTest = detail?.topico?.takingSampleSerologicalTest;

    const methods = useForm({
        resolver: yupResolver<TakingSampleSerologicalTestContract>(takingSampleContractObjectSchema),
        defaultValues: {
            hasIncluded: takingSampleSerologicalTest?.hasIncluded || defaultTakingSampleSerologicalTestContract.hasIncluded,
            executed: takingSampleSerologicalTest?.executed || defaultTakingSampleSerologicalTestContract.executed,
            date: takingSampleSerologicalTest?.date || defaultTakingSampleSerologicalTestContract.date,
            typeSample: takingSampleSerologicalTest?.typeSample || defaultTakingSampleSerologicalTestContract.typeSample,
            description: takingSampleSerologicalTest?.description || defaultTakingSampleSerologicalTestContract.description,
            observation: takingSampleSerologicalTest?.observation || defaultTakingSampleSerologicalTestContract.observation,
            user: takingSampleSerologicalTest?.user || defaultTakingSampleSerologicalTestContract.user
        }
    });

    const { onSubmit, isExecuted, hasSendEmail, onChangeHasSendEmail } = useFormTakingSampleSerologicalTestContract({ contractId, detailId: detail.id, callback });


    return (
        <>
            {(detail.topico?.rabiesVaccination.executed && (detail.topico?.chipReview?.executed || !detail.documentation.chipCertificate.hasServiceIncluded)) &&
                < FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>

                    {!hasServiceIncluded && !takingSampleSerologicalTest?.executed && !isExecuted && <Alert severity="error" sx={{ mb: 1 }}>Aùn no se ha guardado la información relacionada a la toma de muestra</Alert>}

                    {hasServiceIncluded && takingSampleSerologicalTest?.executed && !isExecuted && <Alert severity="info" sx={{ mb: 1 }}>Estos datos ya están guardados y enviados al cliente, sí cambias datos, debes darle click en actualizar</Alert>}

                    {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

                    <TakingSampleSerologicalTestContractFormGeneral />
                    <SendEmailCheck value={hasSendEmail} onChange={onChangeHasSendEmail} label="Enviar notificación al cliente por email y whatsApp" />

                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>

                        {hasServiceIncluded &&
                            <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                                {takingSampleSerologicalTest?.executed ? "Actualizar Toma de muestra" : "Guardar Toma de muestra"}
                            </Button>
                        }

                    </Box>
                </FormProvider >}

            {!detail.topico?.rabiesReVaccination.executed && <Alert severity="error" sx={{ mb: 1 }}>Aùn no se ha guardado la revacunación de rabia en el sistema</Alert>}

            {!detail.topico?.chipReview.executed && <Alert severity="error">Aùn no se ha realizado la revisión del microchip en el sistema</Alert>}

        </>
    )
}

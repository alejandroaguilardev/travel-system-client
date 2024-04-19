import { FC } from "react";
import { useForm } from 'react-hook-form';
import { Alert, Stack, Typography, Box, Button } from '@mui/material';

import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { certificateSchema, defaultValues } from "../certificate-validation";
import { useFormCertificate } from "../use-form-certificate";
import FormProvider from "../../../../../components/hook-form/form-provider";
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { CertificateFormGeneral } from "../certificate-form-general";
import { SendEmailCheck } from '../../../../../components/send-email-check/send-email-check';

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const EmotionalSupportCertificateForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {
    const emotionalSupportCertificate = detail?.documentation?.emotionalSupportCertificate;

    const methods = useForm({
        resolver: yupResolver<DocumentationCertificate>(certificateSchema),
        defaultValues: {
            hasServiceIncluded: emotionalSupportCertificate?.hasServiceIncluded ?? defaultValues.hasServiceIncluded,
            isRequired: emotionalSupportCertificate?.isRequired ?? defaultValues.isRequired,
            isApplied: emotionalSupportCertificate?.isApplied ?? defaultValues.isApplied,
            expectedDate: emotionalSupportCertificate?.expectedDate ?? defaultValues.expectedDate,
            executionDate: emotionalSupportCertificate?.executionDate ?? defaultValues.executionDate,
            resultDate: emotionalSupportCertificate?.resultDate ?? defaultValues.resultDate,
            user: emotionalSupportCertificate?.user ?? defaultValues.user
        }
    });

    const { onSubmit, isExecuted, hasSendEmail, onChangeHasSendEmail } = useFormCertificate({ contractId, detailId: detail.id, callback, action: DOCUMENTATION_KEYS.emotionalSupportCertificate, status: detail.documentation.status });

    if (!methods.watch("hasServiceIncluded")) return <Alert sx={{ mt: 1 }} severity="warning">El servicio no está incluido en este contrato</Alert>

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            {!emotionalSupportCertificate?.isApplied && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada al certificado</Alert>}

            {emotionalSupportCertificate?.isApplied && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

            {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}
            <Typography fontWeight="bold">Certificado de Soporte Emocional</Typography>

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <CertificateFormGeneral label="¿Certificado realizado?" />
                <SendEmailCheck value={hasSendEmail} onChange={onChangeHasSendEmail} label="Enviar correo de notificación al cliente" />

                {emotionalSupportCertificate?.hasServiceIncluded &&
                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            {emotionalSupportCertificate?.isApplied ? "Actualizar MicroemotionalSupportCertificate" : "Guardar MicroemotionalSupportCertificate"}
                        </Button>
                    </Box>
                }
            </Stack>
        </FormProvider>
    );
};

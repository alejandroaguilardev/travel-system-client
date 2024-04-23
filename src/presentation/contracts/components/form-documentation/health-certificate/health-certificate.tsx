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
import { PdfViewer } from "src/components/imp-pdf/pdf-viewer";
import { Contract } from '../../../../../modules/contracts/domain/contract';
import HealthCertificatePdfEs from '../../../pdf/certificates/health-certificate-pdf-es';

type Props = {
    contractId: string;
    contract: Contract;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const HealthCertificateForm: FC<Props> = ({ detail, callback, contractId, contract, onCancel }) => {
    const healthCertificate = detail?.documentation?.healthCertificate;

    const methods = useForm({
        resolver: yupResolver<DocumentationCertificate>(certificateSchema),
        defaultValues: {
            hasServiceIncluded: healthCertificate?.hasServiceIncluded ?? defaultValues.hasServiceIncluded,
            isRequired: healthCertificate?.isRequired ?? defaultValues.isRequired,
            isApplied: healthCertificate?.isApplied ?? defaultValues.isApplied,
            expectedDate: healthCertificate?.expectedDate ?? defaultValues.expectedDate,
            executionDate: healthCertificate?.executionDate ?? defaultValues.executionDate,
            resultDate: healthCertificate?.resultDate ?? defaultValues.resultDate,
            user: healthCertificate?.user ?? defaultValues.user
        }
    });
    const isApplied = methods.watch("isApplied")

    const { onSubmit, isExecuted, hasSendEmail, onChangeHasSendEmail } = useFormCertificate({ contractId, detailId: detail.id, callback, action: DOCUMENTATION_KEYS.healthCertificate, status: detail.documentation.status });

    if (!methods.watch("hasServiceIncluded")) return <Alert sx={{ mt: 1 }} severity="error">El servicio no está incluido en este contrato</Alert>

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            <Typography fontWeight="bold">Certificado de salud</Typography>
            {!healthCertificate?.isApplied && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada al certificado</Alert>}

            {healthCertificate?.isApplied && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

            {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <CertificateFormGeneral label="¿Certificado realizado?" />

                <SendEmailCheck value={hasSendEmail} onChange={onChangeHasSendEmail} label="Enviar correo de notificación al cliente" />

                {(isApplied) &&
                    < PdfViewer height={500} >
                        <HealthCertificatePdfEs detail={detail} contract={contract} />
                    </PdfViewer>
                }

                {healthCertificate?.hasServiceIncluded &&
                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            {healthCertificate?.isApplied ? "Actualizar Certificado de salud" : "Guardar Certificado de salud"}
                        </Button>

                    </Box>
                }
            </Stack>
        </FormProvider>
    );
};

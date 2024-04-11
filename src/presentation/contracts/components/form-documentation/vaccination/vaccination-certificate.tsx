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

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const VaccinationCertificateForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {
    const vaccinationCertificate = detail?.documentation?.vaccinationCertificate;

    const methods = useForm({
        resolver: yupResolver<DocumentationCertificate>(certificateSchema),
        defaultValues: {
            hasServiceIncluded: vaccinationCertificate?.hasServiceIncluded ?? defaultValues.hasServiceIncluded,
            isRequired: vaccinationCertificate?.isRequired ?? defaultValues.isRequired,
            isApplied: vaccinationCertificate?.isApplied ?? defaultValues.isApplied,
            expectedDate: vaccinationCertificate?.expectedDate ?? defaultValues.expectedDate,
            executionDate: vaccinationCertificate?.executionDate ?? defaultValues.executionDate,
            resultDate: vaccinationCertificate?.resultDate ?? defaultValues.resultDate,
            user: vaccinationCertificate?.user ?? defaultValues.user
        }
    });

    const { onSubmit, isExecuted } = useFormCertificate({ contractId, detailId: detail.id, callback, action: DOCUMENTATION_KEYS.vaccinationCertificate, status: detail.documentation.status });


    return (
        <>
            {
                detail.topico?.vaccination.executed ?
                    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
                        <Typography fontWeight="bold">Certificado de Vacuna</Typography>
                        {!vaccinationCertificate?.isApplied && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada al certificado</Alert>}

                        {vaccinationCertificate?.isApplied && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

                        {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

                        <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                            <CertificateFormGeneral label="Impresión de certificado realizado" />

                            {
                                vaccinationCertificate?.hasServiceIncluded &&
                                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                                        {vaccinationCertificate?.isApplied ? "Actualizar Certificado de Vacuna" : "Guardar Certificado de Vacuna<"}
                                    </Button>

                                </Box>
                            }

                        </Stack>
                    </FormProvider>

                    : <Alert severity="error">Aùn no se ha guardado la información  relacionada a la vacuna</Alert>
            }

        </>

    );
};

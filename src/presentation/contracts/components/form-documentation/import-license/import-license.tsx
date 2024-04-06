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

export const ImportLicenseCertificateForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {
    const importLicense = detail?.documentation?.importLicense;

    const methods = useForm({
        resolver: yupResolver<DocumentationCertificate>(certificateSchema),
        defaultValues: {
            hasServiceIncluded: importLicense?.hasServiceIncluded ?? defaultValues.hasServiceIncluded,
            isApplied: importLicense?.isApplied ?? defaultValues.isApplied,
            expectedDate: importLicense?.expectedDate ?? defaultValues.expectedDate,
            resultDate: importLicense?.resultDate ?? defaultValues.resultDate,
            user: importLicense?.user ?? defaultValues.user
        }
    });

    const { onSubmit, isExecuted } = useFormCertificate({ contractId, detailId: detail.id, callback, action: DOCUMENTATION_KEYS.importLicense, status: detail.documentation.status });


    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            {!importLicense?.isApplied && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada al certificado</Alert>}

            {importLicense?.isApplied && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

            {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">Permiso de Importación</Typography>
                <CertificateFormGeneral label="¿Permiso realizado?" />

                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        {importLicense?.isApplied ? "Actualizar Permiso de Importación" : "Guardar Permiso de Importación"}
                    </Button>

                </Box>
            </Stack>
        </FormProvider>
    );
};

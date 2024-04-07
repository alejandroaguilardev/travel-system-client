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
import { ContractStatus } from '../../../../../modules/contracts/domain/contract-status';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';
import { CertificateFormGeneral } from "../certificate-form-general";

type Props = {
    contractId: string;
    status: ContractStatus;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const RabiesTestSerologicalForm: FC<Props> = ({ detail, callback, setIsLoading, contractId, onCancel }) => {
    const { user } = useAuthContext();
    const rabiesSeroLogicalTest = detail?.documentation?.rabiesSeroLogicalTest;
    const isAdmin = user?.auth?.admin;
    const isEdit = !(status === "completed" || status === "canceled");


    const methods = useForm({
        resolver: yupResolver<DocumentationCertificate>(certificateSchema),
        defaultValues: {
            hasServiceIncluded: rabiesSeroLogicalTest?.hasServiceIncluded ?? defaultValues.hasServiceIncluded,
            isApplied: rabiesSeroLogicalTest?.isApplied ?? defaultValues.isApplied,
            isRequired: rabiesSeroLogicalTest?.isRequired ?? defaultValues.isRequired,
            expectedDate: rabiesSeroLogicalTest?.expectedDate ?? defaultValues.expectedDate,
            resultDate: rabiesSeroLogicalTest?.resultDate ?? defaultValues.resultDate,
            user: rabiesSeroLogicalTest?.user ?? defaultValues.user
        }
    });

    const { onSubmit, isExecuted } = useFormCertificate({ contractId, detailId: detail.id, callback, action: DOCUMENTATION_KEYS.rabiesSeroLogicalTest, status: detail.documentation.status, setIsLoading });


    if (!detail.documentation.rabiesSeroLogicalTest.hasServiceIncluded) return <Alert severity="info">En el contrato no incluye la realización del proceso de inspección senasa</Alert>
    if (!detail.pet) return <Alert severity="error">No se ha registrado la mascota en el sistema</Alert>
    if (!detail.topico?.takingSampleSerologicalTest.executed) return <Alert severity="error">Aún no se ha tomado la muestra ir a Topico</Alert>


    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            {
                isEdit && <>
                    {!rabiesSeroLogicalTest?.isApplied && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada al test serológico de rabia</Alert>}
                    {rabiesSeroLogicalTest?.isApplied && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}
                </>
            }


            {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">Test serológico de rabia</Typography>
                <CertificateFormGeneral label="Resultado Recibido?" />


                {!isAdmin && !isEdit && <Alert severity="info" >Solo el administrador puedo editar un contrato ya finalizado</Alert>}

                {(isAdmin || isEdit) &&
                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            {rabiesSeroLogicalTest?.isApplied ? "Actualizar Test de Rabia" : "Guardar Test de Rabia"}
                        </Button>

                    </Box>
                }
            </Stack>
        </FormProvider>
    );
};

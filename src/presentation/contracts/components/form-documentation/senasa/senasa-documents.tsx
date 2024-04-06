import { FC } from "react";
import { useForm } from 'react-hook-form';
import { Alert, Stack, Box, Button } from '@mui/material';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { certificateSchema, defaultValues } from "../certificate-validation";
import { useFormCertificate } from "../use-form-certificate";
import FormProvider from "../../../../../components/hook-form/form-provider";
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { SENASAFormGeneral } from "./senasa-general";
import { TabGenericProvider } from '../../../../../components/tab-generic/context/tab-generic-provider';
import { TabSwitcher } from '../../../../../components/tab-generic/tab-switcher';
import { SENASAFormResult } from "./senasa-result";

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const SenasaDocumentsForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {

    const senasaDocuments = detail?.documentation?.senasaDocuments;

    const methods = useForm({
        resolver: yupResolver<DocumentationCertificate>(certificateSchema),
        defaultValues: {
            hasServiceIncluded: senasaDocuments?.hasServiceIncluded ?? defaultValues.hasServiceIncluded,
            isRequired: senasaDocuments?.isRequired ?? defaultValues.isRequired,
            isApplied: senasaDocuments?.isApplied ?? defaultValues.isApplied,
            expectedDate: senasaDocuments?.expectedDate ?? defaultValues.expectedDate,
            resultDate: senasaDocuments?.resultDate ?? defaultValues.resultDate,
            user: senasaDocuments?.user ?? defaultValues.user
        }
    });

    const { onSubmit, isExecuted } = useFormCertificate({ contractId, detailId: detail.id, callback, action: DOCUMENTATION_KEYS.senasaDocuments, status: detail.documentation.status });


    if (!detail.documentation.senasaDocuments.hasServiceIncluded) return <Alert severity="info">En el contrato no incluye la realización del proceso de inspección senasa</Alert>
    if (!detail.pet) return <Alert severity="error">No se ha registrado la mascota en el sistema</Alert>
    // if (!detail.travel.airlineReservation.departureDate) return <Alert severity="error">Aùn no se ha Asignado fecha de viaje</Alert>

    return (

        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            {!senasaDocuments?.isApplied && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada al certificado</Alert>}

            {senasaDocuments?.isApplied && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

            {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <TabGenericProvider defaultValue={tabs[0].value}>
                    <TabSwitcher
                        tabs={tabs}
                    />
                </TabGenericProvider>


                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        {senasaDocuments?.isApplied ? "Actualizar " : "Guardar"}
                    </Button>

                </Box>
            </Stack>
        </FormProvider>
    );
};


export const tabs = [
    {
        value: "Presentar en SENASA",
        component: <SENASAFormGeneral />
    },
    {
        value: "Resultado del proceso",
        component: <SENASAFormResult />
    },
]
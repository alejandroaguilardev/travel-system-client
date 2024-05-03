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
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';
import { ContractStatus } from '../../../../../modules/contracts/domain/contract-status';
import { ErrorSenasaTravelDate } from "./errorsConditions/error-travel-date";
import { ErrorSenasaCountry } from "./errorsConditions/error-senasa-country";
import { isPetValidateDataCompleted } from '../../../../../modules/pets/domain/pet';
import { travelDestinationValidate } from "src/modules/contracts/domain/contract-services/travel/travel-destination";
import { travelAccompaniedPetValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { PetNotFoundRedirect } from '../../pet-not-found-redirect/pet-not-found-redirect';
import { SendEmailCheck } from '../../../../../components/send-email-check/send-email-check';

type Props = {
    contractId: string;
    status: ContractStatus;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const SenasaDocumentsForm: FC<Props> = ({ detail, setIsLoading, callback, status, contractId, onCancel }) => {
    const { user } = useAuthContext();
    const senasaDocuments = detail?.documentation?.senasaDocuments;
    const isAdmin = user?.auth?.admin;
    const isEdit = !(status === "completed" || status === "canceled");

    const methods = useForm({
        resolver: yupResolver<DocumentationCertificate>(certificateSchema),
        defaultValues: {
            hasServiceIncluded: senasaDocuments?.hasServiceIncluded ?? defaultValues.hasServiceIncluded,
            isRequired: senasaDocuments?.isRequired ?? defaultValues.isRequired,
            isApplied: senasaDocuments?.isApplied ?? defaultValues.isApplied,
            expectedDate: senasaDocuments?.expectedDate ?? defaultValues.expectedDate,
            executionDate: senasaDocuments?.executionDate ?? defaultValues.executionDate,
            resultDate: senasaDocuments?.resultDate ?? defaultValues.resultDate,
            observation: senasaDocuments?.observation ?? defaultValues.observation,
            isPrint: senasaDocuments?.isPrint ?? defaultValues.isPrint,
            user: senasaDocuments?.user ?? defaultValues.user
        }
    });

    const { onSubmit, isExecuted, hasSendEmail, onChangeHasSendEmail } = useFormCertificate({ contractId, detailId: detail.id, callback, action: DOCUMENTATION_KEYS.senasaDocuments, status: detail.documentation.status, setIsLoading });

    const tabs = [
        {
            value: "Presentar en SENASA",
            component: <SENASAFormGeneral contractId={contractId} contractDetailId={detail.id} />
        },
        {
            value: "Resultado del proceso",
            component: <SENASAFormResult />
        },
    ]


    if (!detail.documentation.senasaDocuments.hasServiceIncluded) return <Alert severity="info">En el contrato no incluye la realización del proceso de inspección senasa</Alert>
    if (!isPetValidateDataCompleted(detail.pet) || !detail?.pet) {
        return <PetNotFoundRedirect contractId={contractId} pet={detail?.pet} />
    }

    if (!isPetValidateDataCompleted(detail?.pet)) return <Alert severity="error">Faltan llenar todos los datos de la mascota</Alert>
    if (!detail.travel.airlineReservation.departureDate) return <ErrorSenasaTravelDate contractId={contractId} />
    if (!travelDestinationValidate(detail.travel.destination)) return <Alert severity="error">Faltan llenar todos los datos del destino a donde se dirige la mascota</Alert>
    if (!travelAccompaniedPetValidate(detail.travel?.accompaniedPet)) return <Alert severity="error">Faltan llenar todos los datos del acompañante de la mascota</Alert>


    return (

        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            {
                isEdit && <>
                    {!senasaDocuments?.executionDate && !senasaDocuments?.isApplied && !isExecuted && <Alert severity="error">Aùn no se ha asignado fecha de inspección</Alert>}
                    {!senasaDocuments?.isApplied && !isExecuted && <Alert severity="warning">Aùn no se ha marcado que la inspección senasa fue realizada correctamente</Alert>}

                    {senasaDocuments?.isApplied && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}
                </>
            }

            {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <TabGenericProvider defaultValue={tabs[0].value}>
                    <TabSwitcher
                        tabs={tabs}
                    />
                </TabGenericProvider>


                {!isAdmin && !isEdit
                    ? <Alert severity="info">Solo el administrador puedo editar un contrato ya finalizado</Alert>
                    : <SendEmailCheck value={hasSendEmail} onChange={onChangeHasSendEmail} label="Enviar correo de notificación al cliente" />
                }

                {(isAdmin || isEdit) &&
                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            {senasaDocuments?.isApplied ? "Actualizar " : "Guardar"}
                        </Button>

                    </Box>

                }

            </Stack>
        </FormProvider>
    );
};



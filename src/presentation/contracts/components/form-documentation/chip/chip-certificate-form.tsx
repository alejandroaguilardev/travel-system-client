import { FC, useState } from "react";
import { LoadingButton } from '@mui/lab';
import { Alert, FormControlLabel, Stack, Switch, Typography, } from '@mui/material';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { Contract } from '../../../../../modules/contracts/domain/contract';
import { AlertRedirectButton } from '../../../../../components/alert-redirect-button/alert-redirect-button';
import { paths } from '../../../../../app/routes/paths';
import { TopicTabs } from "../../form-topico/topico-form";
import Label from '../../../../../components/label/label';
import { CertificateDownload, DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { useDownloadCertificate } from '../../../hooks/use-download-certificate';
import { CertificationAlert } from '../certification-alert/certification-alert';
import { travelAccompaniedPetValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { useForm } from "react-hook-form";
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { certificateSchema, defaultValues } from "../certificate-validation";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { useFormCertificate } from "../use-form-certificate";
import { GenerateCertificate } from "../generate-certificate";
import { DateTimePicker } from "@mui/x-date-pickers";
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';

type Props = {
    contractId: string;
    detail: ContractDetail;
    contract: Contract;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const ChipCertificateForm: FC<Props> = ({ contract, detail }) => {
    const chip = detail?.documentation?.chipCertificate;
    const [first, setFirst] = useState(false);
    const chipCertificate = detail?.documentation?.chipCertificate;
    const { downloadCertificate, isLoading } = useDownloadCertificate();

    const methods = useForm({
        resolver: yupResolver<DocumentationCertificate>(certificateSchema),
        defaultValues: {
            hasServiceIncluded: chip?.hasServiceIncluded ?? defaultValues.hasServiceIncluded,
            isApplied: chip?.isApplied ?? defaultValues.isApplied,
            expectedDate: chip?.expectedDate ?? defaultValues.expectedDate,
            executionDate: chip?.executionDate ?? defaultValues.executionDate,
            resultDate: chip?.resultDate ?? defaultValues.resultDate,
            isRequired: chip?.isRequired ?? defaultValues.isRequired,
            observation: chip?.observation ?? defaultValues.observation,
            isPrint: chip?.isPrint ?? defaultValues.isPrint,
            user: chip?.user ?? defaultValues.user
        }
    });

    const { onSubmit, isExecuted, hasSendEmail, onChangeHasSendEmail } = useFormCertificate({ contractId: contract.id, detailId: detail.id, callback: () => false, action: DOCUMENTATION_KEYS.chipCertificate, status: detail.documentation.status });

    return (
        <CertificationAlert contractId={contract.id} detail={detail}>
            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                {
                    chipCertificate?.hasServiceIncluded &&
                    <Stack>
                        <Typography fontWeight="bold">Certificado de implantación de chip</Typography>

                        {
                            !chipCertificate.hasServiceIncluded &&
                            <>
                                <Alert severity="error">El servicio no está incluido en este contrato</Alert>

                                <FormControlLabel
                                    control={<Switch onChange={() => setFirst(!first)} />}
                                    label="¿Es necesario rehacer el certificado?"
                                    style={{
                                        width: "100%"
                                    }}
                                />
                            </>
                        }
                        {
                            (detail.documentation.chipCertificate.hasServiceIncluded || first) &&
                            <Stack my={2}>
                                {(detail?.documentation?.chipCertificate?.resultDate || isExecuted)
                                    ? <>
                                        <DateTimePicker
                                            label="Fecha de Certificado"
                                            sx={{
                                                width: "100%"
                                            }}
                                            disabled
                                            format='DD/MM/YYYY HH:mm:ss'
                                            value={fDayjs(detail?.documentation?.chipCertificate?.resultDate)}

                                        />
                                        <Label color="success" width="100%" my={2}>Completado</Label>
                                    </>
                                    : <Label color="error" width="100%" my={2}>Pendiente</Label>
                                }
                                {(detail?.documentation?.chipCertificate?.resultDate || isExecuted)
                                    ? <LoadingButton
                                        onClick={() => downloadCertificate(contract.id, detail.id, CertificateDownload.MICROCHIP)}
                                        disabled={isLoading}
                                        loading={isLoading}
                                        variant='outlined'
                                        fullWidth
                                        sx={{ mb: 1 }}
                                    >  Descargar datos del certificado en excel
                                    </LoadingButton>
                                    :
                                    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
                                        <GenerateCertificate isLoading={isLoading} onSubmit={onSubmit} hasSendEmail={hasSendEmail} onChangeHasSendEmail={onChangeHasSendEmail} />
                                    </FormProvider>
                                }

                            </Stack>
                        }
                    </Stack>
                }
                {chipCertificate?.hasServiceIncluded && detail.topico?.chip.hasIncluded && !detail?.topico?.chip?.executed &&
                    <AlertRedirectButton alert={{ label: "Aùn no se ha implantado el chip", color: "warning" }} button={{ label: "Ir a implantación de chip", redirect: paths.dashboard.faseDocumentation.topico.management(contract.id, TopicTabs.chip) }} />
                }
                {!travelAccompaniedPetValidate(detail.travel.accompaniedPet) &&
                    <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información de la persona que será titular de los documentos", color: "warning" }} button={{ label: "Ir  a Fase de reserva", redirect: paths.dashboard.contractTravel.update(contract.id) }} />
                }
            </Stack >
        </CertificationAlert>
    );
};

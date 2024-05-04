import { FC, useState } from "react";
import { LoadingButton } from '@mui/lab';
import { Alert, FormControlLabel, Stack, Switch, Typography, } from '@mui/material';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { Contract } from '../../../../../modules/contracts/domain/contract';
import { AlertRedirectButton } from '../../../../../components/alert-redirect-button/alert-redirect-button';
import { paths } from '../../../../../app/routes/paths';
import { TopicTabs } from "../../form-topico/topico-form";
import { PetNotFoundRedirect } from "../../pet-not-found-redirect/pet-not-found-redirect";
import { isPetValidateDataCompleted } from '../../../../../modules/pets/domain/pet';
import { DateTimePicker } from '@mui/x-date-pickers';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import Label from '../../../../../components/label/label';
import { CertificateDownload } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { useDownloadCertificate } from '../../../hooks/use-download-certificate';
import { CertificationAlert } from '../certification-alert/certification-alert';

type Props = {
    contractId: string;
    detail: ContractDetail;
    contract: Contract;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const ChipCertificateForm: FC<Props> = ({ contract, detail }) => {
    const [first, setFirst] = useState(false);
    const chipCertificate = detail?.documentation?.chipCertificate;
    const { downloadCertificate, isLoading } = useDownloadCertificate();




    return (
        <CertificationAlert contractId={contract.id} detail={detail}>
            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                {
                    chipCertificate?.isApplied ?
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
                                    <DateTimePicker
                                        label="Fecha de implantación"
                                        sx={{
                                            width: "100%"
                                        }}
                                        disabled
                                        format='DD/MM/YYYY HH:mm:ss'
                                        value={fDayjs(detail.pet?.chipDate)}

                                    />
                                    <Label color="success" width="100%" my={2}>Completado</Label>
                                    <LoadingButton
                                        onClick={() => downloadCertificate(contract.id, detail.id, CertificateDownload.MICROCHIP)}
                                        disabled={isLoading}
                                        loading={isLoading}
                                        variant='outlined'
                                        fullWidth
                                        sx={{ mb: 1 }}
                                    >  Descargar datos del certificado en excel
                                    </LoadingButton>
                                </Stack>
                            }
                        </Stack>
                        : <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información de la persona que será titular de los documentos", color: "warning" }} button={{ label: "Ir Ir a vacunación de la mascota", redirect: paths.dashboard.faseDocumentation.topico.management(contract.id, TopicTabs.vaccination) }} />
                }
            </Stack >
        </CertificationAlert>
    );
};

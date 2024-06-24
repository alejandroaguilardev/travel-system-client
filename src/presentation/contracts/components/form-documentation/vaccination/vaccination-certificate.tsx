import { FC, useState } from "react";
import { Alert, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material';

import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { Contract } from '../../../../../modules/contracts/domain/contract';
import { travelAccompaniedPetValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { LoadingButton } from "@mui/lab";
import Label from '../../../../../components/label/label';
import { DateTimePicker } from '@mui/x-date-pickers';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { useDownloadCertificate } from '../../../hooks/use-download-certificate';
import { AlertRedirectButton } from '../../../../../components/alert-redirect-button/alert-redirect-button';
import { paths } from '../../../../../app/routes/paths';
import { TopicTabs } from "../../form-topico/topico-form";
import { isPetValidateDataCompleted } from '../../../../../modules/pets/domain/pet';
import { PetNotFoundRedirect } from "../../pet-not-found-redirect/pet-not-found-redirect";
import { CertificateDownload, PdfDownload } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { CertificationAlert } from "../certification-alert/certification-alert";
import { useDownloadPdf } from '../../../hooks/use-download-pdf';

type Props = {
    contract: Contract;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const VaccinationCertificateForm: FC<Props> = ({ detail, contract }) => {
    const [first, setFirst] = useState(false);
    const { downloadCertificate, isLoading } = useDownloadCertificate();
    const { downloadPdf, isLoading: isLoadingPdf } = useDownloadPdf();

    const vaccinationCertificate = detail?.documentation?.vaccinationCertificate;

    if (!isPetValidateDataCompleted(detail.pet) || !detail?.pet) {
        return <PetNotFoundRedirect contractId={contract.id} pet={detail?.pet} />
    }


    if (!travelAccompaniedPetValidate(detail.travel.accompaniedPet)) {
        return detail.travel.typeTraveling === "accompanied"
            ? <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información  relacionada a la persona que acompañará a la mascota", color: "warning" }} button={{ label: "Ir a Fase Reserva", redirect: paths.dashboard.contractTravel.update(contract.id) }} />
            : <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información de la persona que será titular de los documentos", color: "warning" }} button={{ label: "Ir a Fase Reserva", redirect: paths.dashboard.contractTravel.update(contract.id) }} />
    }

    return (
        <CertificationAlert contractId={contract.id} detail={detail}>
            {
                vaccinationCertificate?.isApplied ?
                    <Stack>
                        <Typography fontWeight="bold">Certificado de Vacuna</Typography>

                        {
                            !vaccinationCertificate.hasServiceIncluded &&
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
                                    label="Fecha de vacunación"
                                    sx={{
                                        width: "100%"
                                    }}
                                    disabled
                                    format='DD/MM/YYYY HH:mm:ss'
                                    value={fDayjs(detail.topico?.vaccination?.date)}

                                />
                                <Label color="success" width="100%" my={2}>Completado</Label>
                                <LoadingButton
                                    onClick={() => downloadCertificate(contract.id, detail.id, CertificateDownload.VACCINATION)}
                                    disabled={isLoading}
                                    loading={isLoading}
                                    variant='outlined'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >  Descargar datos del certificado en excel
                                </LoadingButton>

                                <LoadingButton
                                    onClick={() => downloadPdf(contract.id, detail.id, PdfDownload.CDCR)}
                                    disabled={isLoadingPdf}
                                    loading={isLoadingPdf}
                                    variant='outlined'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >  Descargar  CDC USA
                                </LoadingButton>
                            </Stack>
                        }
                    </Stack>
                    : <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información de la persona que será titular de los documentos", color: "warning" }} button={{ label: "Ir Ir a vacunación de la mascota", redirect: paths.dashboard.faseDocumentation.topico.management(contract.id, TopicTabs.vaccination) }} />
            }
        </CertificationAlert>
    );
};

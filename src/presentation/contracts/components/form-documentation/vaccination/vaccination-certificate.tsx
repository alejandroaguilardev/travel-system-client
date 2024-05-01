import { FC, useState } from "react";
import { Alert, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material';

import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { Contract } from '../../../../../modules/contracts/domain/contract';
import { travelAccompaniedPetValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { LoadingButton } from "@mui/lab";
import Label from '../../../../../components/label/label';
import { DatePicker } from "@mui/x-date-pickers";
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { useDownloadCertificate } from '../../../hooks/use-download-certificate';
import { AlertRedirectButton } from '../../../../../components/alert-redirect-button/alert-redirect-button';
import { paths } from '../../../../../app/routes/paths';
import { TopicTabs } from "../../form-topico/topico-form";

type Props = {
    contract: Contract;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const VaccinationCertificateForm: FC<Props> = ({ detail, contract }) => {
    const [first, setFirst] = useState(false);
    const { downloadCertificate, isLoading } = useDownloadCertificate();

    const vaccinationCertificate = detail?.documentation?.vaccinationCertificate;


    if (!travelAccompaniedPetValidate(detail.travel.accompaniedPet)) {
        return detail.travel.typeTraveling === "accompanied"
            ? <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información  relacionada a la persona que acompañará a la mascota", color: "warning" }} button={{ label: "Ir a Fase Reserva", redirect: paths.dashboard.contractTravel.update(contract.id) }} />
            : <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información de la persona que será titular de los documentos", color: "warning" }} button={{ label: "Ir a Fase Reserva", redirect: paths.dashboard.contractTravel.update(contract.id) }} />
    }

    return (
        <>
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
                                <DatePicker
                                    label="Fecha de vacunación"
                                    sx={{
                                        width: "100%"
                                    }}
                                    disabled
                                    format='DD/MM/YYYY'
                                    value={fDayjs(detail.topico?.vaccination?.date)}

                                />
                                <Label color="success" width="100%" my={2}>Completado</Label>
                                <LoadingButton
                                    onClick={() => downloadCertificate(contract.id, detail.id)}
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

        </>

    );
};

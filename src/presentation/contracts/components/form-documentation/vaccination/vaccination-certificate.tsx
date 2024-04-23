import { FC, useState } from "react";
import { Alert, FormControlLabel, Stack, Switch, Typography } from '@mui/material';

import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { PdfViewer } from '../../../../../components/imp-pdf/pdf-viewer';
import VaccinationCertificatePdfEs from '../../../pdf/certificates/vaccination-certificate-pdf-es';
import { Contract } from '../../../../../modules/contracts/domain/contract';
import { travelAccompaniedPetValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';

type Props = {
    contract: Contract;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const VaccinationCertificateForm: FC<Props> = ({ detail, contract }) => {
    const [first, setFirst] = useState(false);
    const vaccinationCertificate = detail?.documentation?.vaccinationCertificate;

    if (!travelAccompaniedPetValidate(detail.travel.accompaniedPet)) {
        return detail.travel.typeTraveling === "accompanied"
            ? <Alert severity="warning">Aùn no se ha guardado la información  relacionada a la persona que acompañará a la mascota</Alert>
            : <Alert severity="warning" > Aùn no se ha guardado la información de la persona que será titular de los documentos</Alert >
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
                            < PdfViewer height={500} >
                                <VaccinationCertificatePdfEs detail={detail} contract={contract} />
                            </PdfViewer>
                        }
                    </Stack>
                    : <Alert severity="warning">Aùn no se ha guardado la información  relacionada a la vacuna</Alert>
            }

        </>

    );
};

import { FC, useState } from "react";
import { Alert, FormControlLabel, Stack, Switch, } from '@mui/material';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { PdfViewer } from '../../../../../components/imp-pdf/pdf-viewer';
import MicrochipCertificatePdf from '../../../pdf/certificates/microchip-certificate-pdf';
import { Contract } from '../../../../../modules/contracts/domain/contract';

type Props = {
    contractId: string;
    detail: ContractDetail;
    contract: Contract;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const ChipCertificateForm: FC<Props> = ({ contract, detail }) => {
    const [first, setFirst] = useState(false);



    return (
        <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
            {
                detail.pet?.chip ?
                    <>
                        {
                            !detail.documentation.chipCertificate.hasServiceIncluded &&
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
                                <MicrochipCertificatePdf detail={detail} contract={contract} />
                            </PdfViewer>
                        }
                    </>

                    : <Alert severity="warning">Aùn no se ha guardado el número del microchip que esta  relacionada al certificado</Alert>
            }
        </Stack >
    );
};

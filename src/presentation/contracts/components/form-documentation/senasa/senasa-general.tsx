import { useEffect, useState } from 'react';
import { Alert, Stack } from '@mui/material';
import { useFormContext } from "react-hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { contractDetailService } from '../../../../../modules/contracts/infrastructure/contract-detail.service';
import { useMessage } from '../../../../../hooks/use-message';
import { downloadFile } from '../../../../../modules/shared/infrastructure/helpers/blob-archive';
import { LoadingButton } from '@mui/lab';

type Props = {
    contractId: string,
    contractDetailId: string,
}

export const SENASAFormGeneral = ({ contractDetailId, contractId }: Props) => {
    const { watch } = useFormContext();
    const { showNotification } = useMessage();
    const [isDisabledButtonDownload, setIsDisabledButtonDownload] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const executionDate = fDayjs(watch("executionDate") ?? null);

    const downloadSenasa = (id: string, detailId: string) => {
        setIsLoading(true);
        contractDetailService.downloadSenasaExcel(id, detailId).then((response) => {
            downloadFile(new Blob([response.file]), response.name);
        }).catch((e) => {
            console.log(e)
            showNotification("No se logró descargar el excel", { variant: "error" })
        }).finally(() => setIsLoading(false));
    }

    useEffect(() => {

        if (!executionDate) setError("Seleccione la fecha para presentar a senasa");
        setIsDisabledButtonDownload(executionDate)
    }, [executionDate]);

    return (
        <>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
                <RHFDate
                    name="executionDate"
                    value={executionDate}
                    label="Fecha para presentar en senasa"
                />
            </Stack>

            <LoadingButton
                onClick={() => downloadSenasa(contractId, contractDetailId)}
                disabled={isLoading || !isDisabledButtonDownload}
                loading={isLoading}
                variant='outlined'
                fullWidth
                sx={{ mb: 1 }}
            >  Descargar Excel Solicitud Senasa
            </LoadingButton>
            {error &&
                <Alert severity='error' >
                    {error}
                </Alert>
            }
        </>
    );
};

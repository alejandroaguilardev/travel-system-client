import { useEffect } from 'react';
import { Alert, Stack } from '@mui/material';
import { useFormContext } from "react-hook-form";
import { LoadingButton } from '@mui/lab';
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { useSenasaExcelDownload } from './use-senasa-excel-download';
import { RHFTextField } from '../../../../../components/hook-form';

type Props = {
    contractId: string,
    contractDetailId: string,
}

export const SENASAFormGeneral = ({ contractDetailId, contractId }: Props) => {
    const { watch, formState } = useFormContext();
    const { downloadSenasa, isLoading } = useSenasaExcelDownload();


    const executionDate = fDayjs(watch("executionDate") ?? null);
    const error = executionDate ? "Seleccione la fecha para presentar a senasa" : "";


    useEffect(() => {
        console.log(formState.errors)
    }, [formState])

    return (
        <>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} mb={2}>
                <RHFDate
                    name="executionDate"
                    value={executionDate}
                    label="Fecha para presentar en senasa (*)"
                    format='DD/MM/YYYY'
                />
                <RHFTextField
                    name='observation'
                    label="Observación"
                />
            </Stack>
            <LoadingButton
                onClick={() => downloadSenasa(contractId, contractDetailId)}
                disabled={isLoading}
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

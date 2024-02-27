import { Stack, Typography } from '@mui/material';
import { RHFTextField, ErrorMessage } from '../../../../../components/hook-form';
import { useContractFormGeneral } from './use-contract-form-general';
import { SearchClient } from '../../../../client/components/search-client/search-client';

export const ContractFormGeneral = () => {
    const { client, startDate, handleClient } = useContractFormGeneral();

    return (
        <Stack spacing={1} marginBottom={2}>
            <Typography variant='h5' mb={2}>Datos del contrato</Typography>
            <Stack spacing={1} marginBottom={1}>
                <RHFTextField
                    name='number'
                    fullWidth
                    label="Número de contrato (*)"
                    variant="outlined"
                    inputAdornment
                    placeholder='C21002'
                />
            </Stack>
            <Stack spacing={1} marginBottom={1}>
                <RHFTextField
                    name='startDate'
                    type='date'
                    value={startDate}
                    fullWidth
                    label="Fecha de contrato (*)"
                    variant="outlined"
                    inputAdornment
                />
                <ErrorMessage name="startDate" />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <SearchClient
                    client={client}
                    handleClient={handleClient}
                    field='client'
                />
            </Stack>
        </Stack >
    )
}

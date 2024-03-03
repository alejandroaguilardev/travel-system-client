import { Paper, Stack, Typography } from '@mui/material';
import { RHFTextField, ErrorMessage } from '../../../../../components/hook-form';
import { useContractFormGeneral } from './use-contract-form-general';
import { SearchClient } from '../../../../client/components/search-client/search-client';

export const ContractFormGeneral = () => {
    const { client, adviser, startDate, handleClient, handleAdvisor } = useContractFormGeneral();

    return (
        <Paper
            sx={{
                p: 3,
                my: 3,
            }}>
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
                <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                    <SearchClient
                        client={adviser}
                        handleClient={handleAdvisor}
                        field='adviser'
                        filters={[{ field: "isAdvisor", value: true }]}
                        textField={{
                            label: "Seleccionar Asesor(*)",
                            placeholder: "Buscar Asesor...",
                        }}

                    />
                </Stack>
            </Stack >
        </Paper>
    )
}

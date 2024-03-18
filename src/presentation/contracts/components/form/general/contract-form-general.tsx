import { Paper, Stack, Typography } from '@mui/material';
import { ErrorMessage } from '../../../../../components/hook-form';
import { SearchClient } from '../../../../client/components/search-client/search-client';
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { useContractFormGeneral } from './use-contract-form-general';
import { AssignNumberFormGeneral } from '../../assign-number-form/assign-number-form-general';

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
                    <RHFDate
                        name="startDate"
                        value={startDate}
                        label="Fecha de contrato (*)"
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
                <AssignNumberFormGeneral />

            </Stack >
        </Paper>
    )
}

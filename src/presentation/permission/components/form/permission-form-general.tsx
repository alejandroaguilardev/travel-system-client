import { Stack } from '@mui/material';
import RHFTextField from '../../../../components/hook-form/rhf-text-field';

export const PermissionFormGeneral = () => (
    <Stack spacing={1} marginBottom={1}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <RHFTextField
                name='group'
                fullWidth
                label="Grupo (*)"
                variant="outlined"
                inputAdornment
            />
            <RHFTextField
                name='name'
                fullWidth
                label="Nombre (*)"
                variant="outlined"
                inputAdornment
            />
        </Stack>
        <RHFTextField
            name='description'
            fullWidth
            label="Descripción"
            variant="outlined"
            multiline
            rows={4}
        />
    </Stack >
)


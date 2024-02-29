import { Divider, MenuItem, Stack } from '@mui/material';
import RHFTextField from '../../../../components/hook-form/rhf-text-field';
import { PROFILE_DOCUMENT } from '../../../../modules/users/domain/profile/profile-document';

export const UserProfileForm = () => {

    return (
        <Stack spacing={1} marginBottom={2}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='document'
                    fullWidth
                    label="Documento (*)"
                    variant="outlined"
                    inputAdornment
                    select
                >
                    {PROFILE_DOCUMENT.map((document) => (
                        <MenuItem key={document} value={document}>
                            {document}
                        </MenuItem>
                    ))}
                </RHFTextField>
                <RHFTextField
                    name='documentNumber'
                    fullWidth
                    label="Número de documento (*)"
                    variant="outlined"
                    inputAdornment
                />
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='name'
                    fullWidth
                    label="Primer Nombre (*)"
                    variant="outlined"
                    inputAdornment
                />
                <RHFTextField
                    name='secondName'
                    fullWidth
                    label="Segundo Nombre"
                    variant="outlined"
                    inputAdornment
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='lastName'
                    fullWidth
                    label="Primer Apellido (*)"
                    variant="outlined"
                    inputAdornment
                />
                <RHFTextField
                    name='secondLastName'
                    fullWidth
                    label="Segundo Apellido"
                    variant="outlined"
                    inputAdornment
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='phone'
                    fullWidth
                    label="Teléfono (*)"
                    variant="outlined"
                    inputAdornment
                />
                <RHFTextField
                    name='gender'
                    fullWidth
                    label="Sexo (*)"
                    variant="outlined"
                    inputAdornment
                    select
                >
                    <MenuItem value="male">Hombre</MenuItem>
                    <MenuItem value="female">Mujer</MenuItem>
                </RHFTextField>
            </Stack>
        </Stack >
    )
}

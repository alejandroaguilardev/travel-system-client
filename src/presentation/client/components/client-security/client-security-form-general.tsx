import { Stack, InputAdornment, IconButton, Divider } from '@mui/material';
import RHFTextField from '../../../../components/hook-form/rhf-text-field';
import Iconify from '../../../../components/iconify/iconify';
import { useBoolean } from '../../../../hooks/use-boolean';

export const ClientSecurityFormGeneral = () => {
    const password = useBoolean();

    return (
        <Stack spacing={2.5} >
            <RHFTextField
                name="password"
                label="Contraseña Actual"
                type={password.value ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={password.onToggle} edge="end">
                                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Divider sx={{ my: 1 }} />

            <RHFTextField
                name="newPassword"
                label="Nueva contraseña"
                type={password.value ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={password.onToggle} edge="end">
                                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <RHFTextField
                name="passwordRepeat"
                label="Repetir la contraseña"
                type={password.value ? 'text' : 'password'}
                sx={{
                    mb: 2
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={password.onToggle} edge="end">
                                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

        </Stack>
    )
}

import { FC } from "react";
import { Alert, IconButton, InputAdornment, Stack } from "@mui/material"
import { useBoolean } from '../../../hooks/use-boolean';
import RHFTextField from '../../../components/hook-form/rhf-text-field';
import Iconify from '../../../components/iconify/iconify';

type Props = {
    errorMsg: string;
}

export const ResetPasswordForm: FC<Props> = ({ errorMsg }) => {
    const password = useBoolean();

    return (
        <Stack spacing={2.5} >
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <RHFTextField
                name="password"
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
                onKeyDown={(e) => {
                    if (e.key === ' ') {
                        e.preventDefault();
                    }
                }}
            />
            <RHFTextField
                name="passwordRepeat"
                label="Repetir la contraseña"
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
                onKeyDown={(e) => {
                    if (e.key === ' ') {
                        e.preventDefault();
                    }
                }}
            />
        </Stack>
    )
}

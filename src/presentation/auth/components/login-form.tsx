import { Alert, IconButton, InputAdornment, Stack } from "@mui/material"
import { useBoolean } from '../../../hooks/use-boolean';
import RHFTextField from '../../../components/hook-form/rhf-text-field';
import Iconify from '../../../components/iconify/iconify';
import { FC } from "react";

type Props = {
    errorMsg: string;
}

export const LoginForm: FC<Props> = ({ errorMsg }) => {
    const password = useBoolean();

    return (
        <Stack spacing={2.5} >
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <RHFTextField name="email" label="Correo Electrónico" />

            <RHFTextField
                name="password"
                label="Contraseña"
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
        </Stack>
    )
}

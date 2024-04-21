import { FC } from "react";
import { Alert, IconButton, InputAdornment, MenuItem, Stack } from "@mui/material"
import { useBoolean } from '../../../hooks/use-boolean';
import RHFTextField from '../../../components/hook-form/rhf-text-field';
import Iconify from '../../../components/iconify/iconify';
import { PROFILE_DOCUMENT } from '../../../modules/users/domain/profile/profile-document';

type Props = {
    errorMsg: string;
}

export const LoginForm: FC<Props> = ({ errorMsg }) => {
    const password = useBoolean();

    return (
        <Stack spacing={2.5} >
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <RHFTextField name="document" label="Documento" select sx={{ minWidth: "1%" }}>
                    {PROFILE_DOCUMENT.map(document => (
                        <MenuItem key={document} value={document}>{document}</MenuItem>
                    ))}
                </RHFTextField>
                <RHFTextField name="documentNumber" label="N° de documento" />
            </Stack>

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

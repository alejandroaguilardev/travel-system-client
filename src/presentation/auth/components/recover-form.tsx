import { Alert, Stack } from "@mui/material"
import RHFTextField from '../../../components/hook-form/rhf-text-field';
import { FC } from "react";

type Props = {
    errorMsg: string;
}

export const RecoverForm: FC<Props> = ({ errorMsg }) => {

    return (
        <Stack spacing={2.5} >
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <RHFTextField name="email" label="Correo Electrónico" />
        </Stack>
    )
}

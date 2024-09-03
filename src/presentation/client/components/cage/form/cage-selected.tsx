import { FC } from "react";
import { InputAdornment, Stack } from '@mui/material';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import Iconify from '../../../../../components/iconify';

type Props = {
    readonly: boolean;
    keyField: string;
}

export const CageSelected: FC<Props> = ({ readonly, keyField }) => {

    return (
        <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} flexGrow={1} sx={{ minWidth: 0, my: 2 }}>
            <RHFTextField
                name={`${keyField}.typeCage`}
                label="Tipo de jaula (*)"
                inputAdornment
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={readonly ? "fluent:presence-blocked-10-regular" : "mdi:text"} />
                        </InputAdornment>
                    ),
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 1, background: "#eee" } : {}}
            />
            <RHFTextField
                name={`${keyField}.modelCage`}
                label="Modelo de jaula (*)"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={readonly ? "fluent:presence-blocked-10-regular" : "mdi:text"} />
                        </InputAdornment>
                    ),
                    readOnly: readonly,
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 1, background: "#eee" } : {}}

            />
            <RHFTextField
                name={`${keyField}.dimensionsCage`}
                label="Medidas (Largo x Ancho x Alto) (*)"
                inputAdornment
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon={readonly ? "fluent:presence-blocked-10-regular" : "mdi:text"} />
                        </InputAdornment>
                    ),
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 1, background: "#eee" } : {}}
            />

        </Stack>
    )
}

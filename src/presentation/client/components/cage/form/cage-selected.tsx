import { FC } from "react";
import { MenuItem, InputAdornment } from '@mui/material';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { CAGE_TYPE } from '../../../../../modules/cages/domain/cage-type';
import Iconify from '../../../../../components/iconify';

type Props = {
    readonly: boolean;
    keyField: string;
}

export const CageSelected: FC<Props> = ({ readonly, keyField }) => {

    return (
        <>
            <RHFTextField
                name={`${keyField}.typeCage`}
                label="Tipo de jaula"
                inputAdornment
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="mdi:text" />
                        </InputAdornment>
                    ),
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <RHFTextField
                name={`${keyField}.modelCage`}
                label="Modelo de jaula"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="mdi:text" />
                        </InputAdornment>
                    ),
                    readOnly: readonly,
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}

            />
            <RHFTextField
                name={`${keyField}.dimensionsCage`}
                label="Dimensiones"
                inputAdornment
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify icon="mdi:text" />
                        </InputAdornment>
                    ),
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />

        </>
    )
}

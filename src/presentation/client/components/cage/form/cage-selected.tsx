import { FC } from "react";
import { MenuItem } from "@mui/material";
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { CAGE_TYPE } from '../../../../../modules/cages/domain/cage-type';

type Props = {
    readonly: boolean;
    keyField: string;
}

export const CageSelected: FC<Props> = ({ readonly, keyField }) => {

    return (
        <>
            <RHFTextField
                name={`${keyField}.typeCage`}
                select
                label="Tipo de jaula"
                InputProps={{
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}

            >
                {CAGE_TYPE.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option.toUpperCase()}
                    </MenuItem>
                ))}
            </RHFTextField>
            <RHFTextField
                name={`${keyField}.modelCage`}
                label="Modelo de jaula"
                InputProps={{
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}

            />
            <RHFTextField
                name={`${keyField}.dimensionsCage`}
                label="Dimensiones"
                InputProps={{
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}

            />

        </>
    )
}

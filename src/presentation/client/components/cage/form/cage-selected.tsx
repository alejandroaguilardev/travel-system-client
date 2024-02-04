import { FC } from "react";
import { MenuItem } from "@mui/material";
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { TYPE_CAGE } from '../../../../../modules/contracts/domain/contract-services/cage/cage-chosen';

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
                label="Tpo de jaula"
                InputProps={{
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}

            >
                {TYPE_CAGE.map((option) => (
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

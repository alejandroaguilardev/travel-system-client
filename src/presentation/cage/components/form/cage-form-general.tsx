import { MenuItem, Stack } from '@mui/material';
import RHFTextField from '../../../../components/hook-form/rhf-text-field';
import { CAGE_TYPE } from '../../../../modules/cages/domain/cage-type';

export const CageFormGeneral = () => (
    <Stack spacing={1} marginBottom={1}>
        <RHFTextField
            name="typeCage"
            select
            label="Tipo de jaula (*)"
        >
            {CAGE_TYPE.map((option) => (
                <MenuItem key={option} value={option}>
                    {option.toUpperCase()}
                </MenuItem>
            ))}
        </RHFTextField>
        <RHFTextField
            name="modelCage"
            label="Modelo de jaula (*)"
        />
        <RHFTextField
            name="dimensionsCage"
            label="Dimensiones de la jaula (*)"
        />
    </Stack >
)


import { Box, MenuItem, Stack } from '@mui/material';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { PET_GENDERS, PetGender } from '../../../../../modules/pets/domain/pet-gender';
import { usePetFormGeneral } from './use-pet-form-general';

export const PetFormGeneral = () => {
    const { chip, chipDate, birthDate } = usePetFormGeneral();

    return (
        <Stack spacing={1} marginBottom={1}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name="name"
                    label="Nombre (*)"
                />
                <RHFTextField
                    name="birthDate"
                    value={birthDate}
                    type='birthDate'
                    label="Fecha de nacimiento (*)"
                    inputAdornment
                />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name="type"
                    label="Animal (*)"
                />
                <RHFTextField
                    name="race"
                    label="Raza (*)"
                />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name="chip"
                    label="Chip"
                />
                {chip ? <RHFTextField
                    name="chipDate"
                    value={chipDate}
                    type='date'
                    label="Chip Fecha de instalación"
                    inputAdornment
                /> : <Box width="100%" />}
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name="color"
                    label="Color (*)"
                />
                <RHFTextField
                    name="gender"
                    select
                    label="Sexo (*)"
                >
                    {Object.keys(PET_GENDERS).map((option) => (
                        <MenuItem key={option} value={option}>
                            {PET_GENDERS[option as PetGender]}
                        </MenuItem>
                    ))}
                </RHFTextField>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name="sterilized"
                    select
                    label="Esterilizado (*)"
                >
                    <MenuItem value="Si">
                        Si
                    </MenuItem>
                    <MenuItem value="No">
                        No
                    </MenuItem>
                </RHFTextField>

            </Stack>
        </Stack>
    )
}

import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { PET_GENDERS, PetGender } from '../../../../../modules/pets/domain/pet-gender';
import { SearchClient } from '../../../../client/components/search-client/search-client';
import { usePetFormGeneral } from './use-pet-form-general';
import { ContractFormCage } from '../../../../contracts/components/form/cage/contract-form-cage';
import { CageSelected } from '../../../../client/components/cage/form/cage-selected';

export const PetFormGeneral = () => {
    const { chip, chipDate, birthDate, client, handleClient } = usePetFormGeneral();

    return (
        <Stack spacing={1} marginBottom={1}>
            <SearchClient
                client={client}
                handleClient={handleClient}
                field='adopter'
            />
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
            <Divider />
            <Typography fontWeight="bold">
                Recomendación de la jaula de la mascota
            </Typography>
            <Divider />
            <ContractFormCage keyValue='cageRecommendation' />
            <CageSelected keyField="cageRecommendation" readonly />

        </Stack>
    )
}

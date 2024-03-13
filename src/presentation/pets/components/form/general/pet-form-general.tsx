import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { CageSelected } from '../../../../client/components/cage/form/cage-selected';
import { SearchClient } from '../../../../client/components/search-client/search-client';
import { PET_GENDERS, PetGender } from '../../../../../modules/pets/domain/pet-gender';
import { ContractFormCage } from '../../../../contracts/components/form/cage/contract-form-cage';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { usePetFormGeneral } from './use-pet-form-general';

type Props = {
    hasRecommendation?: boolean
}

export const PetFormGeneral = ({ hasRecommendation = false }: Props) => {
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
                <RHFDate
                    name="birthDate"
                    value={birthDate}
                    label="Fecha de nacimiento (*)"
                />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name="type"
                    label="Especie (*)"
                    select
                >
                    <MenuItem value="Perro">Perro</MenuItem>
                    <MenuItem value="Gato">Gato</MenuItem>
                    <MenuItem value="Hurón">Hurón</MenuItem>
                    <MenuItem value="Otros">Otros</MenuItem>
                </RHFTextField>

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
                {chip ? <RHFDate
                    name="chipDate"
                    value={chipDate}
                    label="Chip Fecha de instalación"
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
            {
                hasRecommendation &&
                <>
                    <Divider />
                    <Typography fontWeight="bold">
                        Recomendación de la jaula de la mascota
                    </Typography>
                    <Divider />
                    <ContractFormCage keyValue='cageRecommendation' />
                    <CageSelected keyField="cageRecommendation" readonly />
                </>
            }

        </Stack>
    )
}

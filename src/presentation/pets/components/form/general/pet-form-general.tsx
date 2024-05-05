import { Box, Checkbox, Divider, FormControlLabel, MenuItem, Stack, Typography } from '@mui/material';
import { CageSelected } from '../../../../client/components/cage/form/cage-selected';
import { SearchClient } from '../../../../client/components/search-client/search-client';
import { PET_GENDERS, PetGender } from '../../../../../modules/pets/domain/pet-gender';
import { ContractFormCage } from '../../../../contracts/components/form/cage/contract-form-cage';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { usePetFormGeneral } from './use-pet-form-general';
import RHFSwitch from '../../../../../components/hook-form/rhf-switch';

type Props = {
    hasClient?: boolean;
    hasMeasurementsAndWeight?: boolean;
    hasRecommendation?: boolean;
    hasChip?: boolean;
}

export const PetFormGeneral = ({ hasClient = false, hasMeasurementsAndWeight = false, hasRecommendation = false, hasChip = false }: Props) => {
    const { chip, chipDate, birthDate, client, handleClient, handleChip } = usePetFormGeneral();

    return (
        <Stack spacing={1} marginBottom={1}>
            {hasClient &&
                <SearchClient
                    client={client}
                    handleClient={handleClient}
                    field='adopter'
                />
            }

            {hasChip &&
                <>
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

                </>

            }
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
                    <MenuItem value="Canino">Canino</MenuItem>
                    <MenuItem value="Felino">Felino</MenuItem>
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
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFSwitch name="isBrachycephalic" label="¿La especie es braquiocefálica?" />
                <RHFSwitch name="isPotentiallyDangerous" label="¿La especie es potencialmente peligrosa?" />
            </Stack>

            {
                hasMeasurementsAndWeight &&
                <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                    <Typography fontWeight="bold">Medición Antropométrica</Typography>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <RHFTextField
                            name="measurementsAndWeight.height"
                            label="Alto(cm) *"
                        />
                        <RHFTextField
                            name="measurementsAndWeight.width"
                            label="Ancho(cm) *"
                        />
                        <RHFTextField
                            name="measurementsAndWeight.length"
                            label="Largo (cm) *"
                        />
                        <RHFTextField
                            name="measurementsAndWeight.weight"
                            label="Peso (kg) *"
                        />
                    </Stack>
                </Stack>
            }
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

import { Alert, Box, Divider, FormControl, FormControlLabel, MenuItem, Stack, Switch, Typography } from '@mui/material';
import { SearchClient } from '../../../../client/components/search-client/search-client';
import { PET_GENDERS, PetGender } from '../../../../../modules/pets/domain/pet-gender';
import { ContractFormCage } from '../../../../contracts/components/form/cage/contract-form-cage';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { usePetFormGeneral } from './use-pet-form-general';
import RHFSwitch from '../../../../../components/hook-form/rhf-switch';
import Image from 'src/components/image/image';
import { HOST_ASSETS_IMAGES } from '../../../../../app/config/config-global';
import { PET_TYPES } from '../../../../../modules/pets/domain/pet-type';
import { isPetBabyAge, isPrintMessageForMoreOneMonth } from '../../../../../modules/pets/domain/pet-age';
import { fDate, fDayDiffDays, fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { useMemo, useState } from 'react';
import { ErrorMessage } from '../../../../../components/hook-form/error-message';

type Props = {
    hasClient?: boolean;
    hasMeasurementsAndWeight?: boolean;
    hasRecommendation?: boolean;
    hasShowChip?: boolean;
    hasImage?: boolean;
}

export const PetFormGeneral = ({ hasClient = false, hasMeasurementsAndWeight = false, hasRecommendation = false, hasShowChip = false, hasImage = false }: Props) => {
    const { id, type, chip, chipDate, birthDate, dateUpdatedAt, client, image, handleClient } = usePetFormGeneral();

    const alertUpdate: boolean = useMemo(() =>
        isPrintMessageForMoreOneMonth(fDayjs(birthDate).toDate(), fDayDiffDays(new Date(), fDayjs(dateUpdatedAt).toDate())) &&
        isPetBabyAge(type, fDayjs(birthDate).toDate()), [birthDate, type, id]);


    const [hasChip, setHasChip] = useState(!!chip);

    return (
        <Stack spacing={1} marginBottom={1}>
            {hasClient &&
                <SearchClient
                    client={client}
                    handleClient={handleClient}
                    field='adopter'
                    newPerson={true}
                    labelNewPerson="Crear nuevo cliente"
                />
            }
            {<FormControlLabel
                control={<Switch onChange={() => setHasChip(!hasChip)} value={hasChip} checked={hasChip} />}
                label="¿La mascota ya tiene Chip"
            />
            }
            {hasShowChip && hasChip &&
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
                    {PET_TYPES.map((pet) => (
                        <MenuItem key={pet.value} value={pet.value}>
                            {pet.label}
                        </MenuItem>
                    ))}
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
                    <Typography fontWeight="bold">
                        Medición Antropométrica
                    </Typography>
                    {
                        id &&
                        <Alert severity={alertUpdate ? "error" : "info"}>
                            {isPetBabyAge(type, fDayjs(birthDate).toDate())
                                ? `La Mascota es un cachorro se debe hacer seguimiento se sus medidas y peso. Última Actualización fue ${fDate(dateUpdatedAt)}`
                                : `Última Actualización de las medidas y peso ${fDate(dateUpdatedAt)}`
                            }

                        </Alert>
                    }
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <RHFTextField
                            name="measurementsAndWeight.height"
                            label="Alto(cm) *"
                            type='number'
                        />
                        <RHFTextField
                            name="measurementsAndWeight.width"
                            label="Ancho(cm) *"
                            type='number'
                        />
                        <RHFTextField
                            name="measurementsAndWeight.length"
                            label="Largo (cm) *"
                            type='number'
                        />
                        <RHFTextField
                            name="measurementsAndWeight.weight"
                            label="Peso (kg) *"
                            type='number'
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
                    <ErrorMessage name="cageRecommendation.modelCage" />
                    {/* <CageSelected keyField="cageRecommendation" readonly /> */}
                </>
            }
            {hasImage &&
                <Image
                    src={`${HOST_ASSETS_IMAGES}/${image}`}
                    height={200}
                    objectFit='contain'
                />
            }

        </Stack>
    )
}

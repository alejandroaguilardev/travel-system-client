import { MenuItem, Stack, Typography } from "@mui/material";
import { RHFTextField } from "../../../../../components/hook-form";
import { PET_GENDERS, PetGender } from "../../../../../modules/pets/domain/pet-gender";
import { ContractFormCage } from "../../form/cage/contract-form-cage";
import { CageSelected } from "src/presentation/client/components/cage/form/cage-selected";

export const MeasurementsAndWeightFormGeneral = () => {

    return (
        <>
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

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">Recomendación de Jaula</Typography>
                <ContractFormCage keyValue="cageRecommendation" />
                <CageSelected readonly keyField="cageRecommendation" />

            </Stack>

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">Confirmar datos de la mascota</Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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
                        label="Raza *"
                    />
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

                    <RHFTextField
                        name="color"
                        label="Color *"
                    />
                </Stack>
            </Stack >
        </>
    );
};

import { Alert, Stack, TextField, Typography } from "@mui/material";
import { CageSelected } from "./cage-selected";
import { Pet } from '../../../../../modules/pets/domain/pet';

type Props = {
    pet: Pet;
}

export const CageFormGeneral = ({ pet }: Props) => {


    return (
        <Stack spacing={1} my={1}>
            <Alert variant='outlined' sx={{ width: "100%" }} severity="info">Recomendamos siempre que la jaula tenga dos comedero y un bebedero</Alert>

            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">Medidas de la Mascota</Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                        label="Alto(cm) *"
                        value={pet?.measurementsAndWeight?.height}
                        disabled
                    />
                    <TextField
                        label="Ancho(cm) *"
                        value={pet?.measurementsAndWeight?.width}
                        disabled
                    />
                    <TextField
                        label="Largo (cm) *"
                        value={pet?.measurementsAndWeight?.length}
                        disabled
                    />
                    <TextField
                        label="Peso (kg) *"
                        value={pet?.measurementsAndWeight?.weight}
                        disabled
                    />
                </Stack>
            </Stack>
        </Stack >
    );
}
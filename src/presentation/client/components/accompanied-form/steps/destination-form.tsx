import { useFormContext } from 'react-hook-form';
import { Stack, TextField, Typography } from "@mui/material"
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { countries } from '../../../../../modules/shared/domain/helpers/countries';

type Props = {
    notButton: boolean;
}

export const DestinationFormGeneral = ({ notButton }: Props) => {
    const { watch } = useFormContext();
    const country = watch("destination.countryDestination") || null;

    return (
        <>

            <Stack spacing={2} >
                <Typography variant={notButton ? "h6" : "h4"}>
                    Destino de la mascota:
                </Typography>

                <TextField
                    value={countries.find(_ => _.name_es === country)?.name_es ?? ""}
                    label="País Destino (*)"
                    variant="outlined"
                    disabled
                />



                <RHFTextField
                    name="destination.cityDestination"
                    label="Ciudad destino (*)"
                    inputAdornment
                />
                <RHFTextField
                    name="destination.directionDestination"
                    label="Dirección destino (*)"
                    inputAdornment
                />
                <RHFTextField
                    name="observation"
                    label="Observaciones"
                    multiline
                    rows={3}

                />
            </Stack>
        </>
    )
}

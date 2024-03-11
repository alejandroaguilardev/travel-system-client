import { useFormContext } from 'react-hook-form';
import { Divider, Stack, Typography } from "@mui/material"
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { AutocompleteSelectorClient } from '../../../../../components/autocomplete/client/autocomplete-selector-client';
import { countries } from '../../../../../modules/shared/domain/helpers/countries';


export const DestinationFormGeneral = () => {
    const { setValue, watch } = useFormContext();
    const handleCountry = (value: string) => setValue("destination.countryDestination", value);
    const country = watch("destination.countryDestination") || null;

    return (
        <>

            <Stack spacing={2} mb={5}>
                <Typography variant="h4">
                    Datos de la persona  que viaja y/o envía por cargo la mascota:
                </Typography>
                <Divider />

                <AutocompleteSelectorClient
                    textField={{
                        label: "País Destino (*)"
                    }}
                    items={countries}
                    defaultValue={countries.find(_ => _.name_es === country) || null}
                    getOptionLabel={(d: any) => d.name_es}
                    callback={(value) => {
                        handleCountry(value?.name_es ?? "");
                    }}
                    propertiesFilter={["name_es"]}
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
            </Stack>
        </>
    )
}

import { useFormContext } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { RHFSwitch, RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TopicoSearchUser } from "../search-user";

export const ChipFormGeneral = () => {
    const { watch } = useFormContext();
    const chipHasIncluded = watch("hasIncluded");
    const date = fDayjs(watch("date"));

    return (
        <>
            <Stack flexWrap="wrap" spacing={2} marginBottom={3}>
                <Typography fontWeight="bold">Implantación de Chip</Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFSwitch
                        name="hasIncluded"
                        label="¿La mascota ya tiene la implantación de chip?"
                    />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFDate
                        name="date"
                        value={date}
                        label={chipHasIncluded ? "Fecha de cuando le implantaron el chip implantación (*)" : "Fecha de la implantación del microchip(*)"}
                    />

                    <RHFTextField
                        name="description"
                        label="Micro chip (*)"
                    />
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFTextField
                        name="observation"
                        label="Observaciones"
                    />
                </Stack>
                <Stack spacing={2}>
                    <TopicoSearchUser />
                </Stack>
            </Stack >
        </>
    );
};

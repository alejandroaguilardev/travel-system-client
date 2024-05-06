import { useFormContext } from "react-hook-form";
import { Divider, Stack, Typography } from "@mui/material";
import { RHFSwitch, RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TopicoSearchUser } from "../topico-search-user";

export const ChipFormGeneral = () => {
    const { watch } = useFormContext();
    const chipHasIncluded = watch("hasIncluded");
    const executed = watch("executed");
    const date = fDayjs(watch("date"));


    return (
        <>
            <Stack flexWrap="wrap" spacing={2} marginBottom={3}>
                <Typography fontWeight="bold">{chipHasIncluded ? "Implantación de Chip" : "Revisar si la mascota tiene chip"}</Typography>
                <Stack spacing={2}>
                    <TopicoSearchUser />
                </Stack>
                <Divider />
                {!chipHasIncluded &&
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <RHFSwitch
                            name="executed"
                            label="¿La mascota ya tiene la implantación de chip?"
                        />
                    </Stack>

                }
                {
                    (chipHasIncluded || executed) &&
                    <>
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
                    </>
                }

            </Stack >
        </>
    );
};

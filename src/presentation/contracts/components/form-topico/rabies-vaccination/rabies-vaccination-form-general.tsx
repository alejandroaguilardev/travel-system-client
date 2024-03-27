import { useFormContext } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { RHFSwitch, RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TopicoSearchUser } from "../search-user";

export const RabiesVaccinationFormGeneral = () => {
    const { watch } = useFormContext();
    const hasIncluded = watch("hasIncluded");
    const date = fDayjs(watch("date"));


    return (
        <>
            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">Aplicar la vacuna de rabia</Typography>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFSwitch
                        name="hasIncluded"
                        label={`¿La mascota ya tiene la vacuna de rabia?`}
                    />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFDate
                        name="date"
                        value={date}
                        label={hasIncluded ? "Fecha de cuando aplicaron la vacuna" : "Fecha de la vacuna"}
                    />
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFTextField
                        name="observation"
                        label="Observaciones"
                    />
                </Stack>
                <TopicoSearchUser />

            </Stack>
        </>
    );
};

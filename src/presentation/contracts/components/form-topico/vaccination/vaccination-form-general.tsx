import { useFormContext } from "react-hook-form";
import { Divider, Stack, Typography } from "@mui/material";
import { RHFSwitch, RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TopicoSearchUser } from "../topico-search-user";

type Props = {
    title: string;
}

export const VaccinationFormGeneral = ({ title }: Props) => {
    const { watch } = useFormContext();
    const hasIncluded = watch("hasIncluded");
    const date = fDayjs(watch("date"));


    return (
        <>
            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">{title}</Typography>
                <Stack spacing={2}>
                    <TopicoSearchUser />
                </Stack>
                <Divider />
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFSwitch
                        name="hasIncluded"
                        label={`¿La mascota ya tiene la ${title}?`}
                    />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFDate
                        name="date"
                        value={date}
                        label={hasIncluded ? "Fecha de cuando aplicaron la vacuna" : "Fecha de la vacuna"}
                    />

                    <RHFTextField
                        name="description"
                        label="Vacuna aplicada"
                    />
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFTextField
                        name="observation"
                        label="Observaciones"
                    />
                </Stack>

            </Stack>
        </>
    );
};

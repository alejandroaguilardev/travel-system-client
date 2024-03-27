import { useFormContext } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TopicoSearchUser } from "../search-user";

export const RabiesReVaccinationFormGeneral = () => {
    const { watch } = useFormContext();
    const date = fDayjs(watch("date"));


    return (
        <>
            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">Aplicar la revacuna de rabia</Typography>


                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFDate
                        name="date"
                        value={date}
                        label="Fecha de la revacuna de rabia"
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

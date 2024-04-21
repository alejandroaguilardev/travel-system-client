import { useFormContext } from "react-hook-form";
import { Divider, Stack, Typography } from "@mui/material";
import { RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TopicoSearchUser } from "../topico-search-user";

export const ChipReviewFormGeneral = () => {
    const { watch } = useFormContext();
    const date = fDayjs(watch("date"));


    return (
        <>
            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Typography fontWeight="bold">Revisión de Microchip</Typography>
                <Stack spacing={2}>
                    <TopicoSearchUser />
                </Stack>
                <Divider />


                <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={2}>
                    <RHFDate
                        name="date"
                        value={date}
                        label="Fecha de revisión de microchip"
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

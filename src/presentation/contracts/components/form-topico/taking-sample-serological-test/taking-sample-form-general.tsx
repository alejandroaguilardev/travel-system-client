import { useFormContext } from "react-hook-form";
import { MenuItem, Stack, Typography } from "@mui/material";
import { RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TopicoSearchUser } from "../search-user";

export const TakingSampleSerologicalTestContractFormGeneral = () => {
    const { watch } = useFormContext();
    const date = fDayjs(watch("date"));


    return (
        <>
            <Stack flexWrap="wrap" spacing={1} my={3}>


                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFDate
                        name="date"
                        value={date}
                        label="Fecha de toma de muestra"
                    />
                </Stack>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFTextField
                        name="typeSample"
                        label="Tipo de Muestra"
                        select
                    >

                        <MenuItem value="PR">Muestra PR</MenuItem>
                        <MenuItem value="AYU">Muestra AYU</MenuItem>
                    </RHFTextField>
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

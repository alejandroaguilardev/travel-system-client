import { useEffect } from "react";
import { Stack, } from '@mui/material';
import { useFormContext } from "react-hook-form";
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import RHFSwitch from '../../../../../components/hook-form/rhf-switch';
import { RHFDate } from '../../../../../components/hook-form/rhf-date';


export const SENASAFormResult = () => {
    const { watch, setValue } = useFormContext();

    const isApplied = watch("isApplied");
    const resultDate = fDayjs(watch("resultDate") ?? null);

    useEffect(() => {
        if (isApplied && !resultDate) {
            setValue("resultDate", fDayjs(new Date()));
        }
        if (!isApplied) {
            setValue("resultDate", null);

        }
    }, [isApplied, resultDate]);

    return (
        <>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <RHFSwitch
                    name="isApplied"
                    label="Proceso ejecutado con éxito"
                    style={{
                        width: "100%"
                    }}

                />
                <RHFDate
                    name="resultDate"
                    value={resultDate}
                    label="Fecha de ejecución"
                />
            </Stack>
        </>
    );
};

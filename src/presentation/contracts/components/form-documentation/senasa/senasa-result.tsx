import { useEffect } from "react";
import { Stack, } from '@mui/material';
import { useFormContext } from "react-hook-form";
import RHFSwitch from '../../../../../components/hook-form/rhf-switch';
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';


export const SENASAFormResult = () => {
    const { watch, setValue } = useFormContext();

    const isApplied = watch("isApplied");
    const resultDate = watch("resultDate") ?? null;

    useEffect(() => {
        if (isApplied && !resultDate) {
            setValue("resultDate", new Date());
        }
        if (!isApplied) {
            setValue("resultDate", null);

        }
    }, [isApplied]);

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
                    value={fDayjs(resultDate)}
                    label="Fecha de ejecución"
                />
            </Stack>
        </>
    );
};

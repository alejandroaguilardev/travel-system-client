import { useEffect } from "react";
import { Stack, TextField, FormControlLabel, Switch } from '@mui/material';
import { useFormContext } from "react-hook-form";
import { fDate, fDayjs } from '../../../../modules/shared/infrastructure/helpers/format-time';
import RHFSwitch from '../../../../components/hook-form/rhf-switch';
import { RHFDate } from '../../../../components/hook-form/rhf-date';

export const CertificateFormGeneral = () => {
    const { watch, setValue } = useFormContext();

    const hasServiceIncluded = watch("hasServiceIncluded");
    const isApplied = watch("isApplied");
    const expectedDate = watch("expectedDate");
    const executionDate = watch("executionDate") ?? null;

    useEffect(() => {
        if (isApplied && !executionDate) {
            setValue("executionDate", fDayjs(new Date()));
        }
        if (!isApplied) {
            setValue("executionDate", null);

        }
    }, [isApplied, executionDate]);

    return (
        <>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <FormControlLabel
                    label="Incluido en el servicio"
                    control={<Switch
                        checked={hasServiceIncluded}
                        disabled
                    />}
                    style={{
                        width: "100%",
                    }}
                />
                <TextField
                    value={fDate(expectedDate, "DD/MM/YYYY")}
                    label="Fecha prevista de instalación de microchip"
                    fullWidth
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <RHFSwitch
                    name="isApplied"
                    label={hasServiceIncluded ? "Certificado ejecutado" : "¿Es necesario rehacer el certificado?"}
                    style={{
                        width: "100%"
                    }}

                />
                <RHFDate
                    name="executionDate"
                    value={executionDate}
                    label="Fecha de ejecución"
                />
            </Stack>

        </>
    );
};

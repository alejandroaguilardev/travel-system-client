import { useEffect } from "react";
import { Stack, TextField, FormControlLabel, Switch, Alert } from '@mui/material';
import { useFormContext } from "react-hook-form";
import { fDate, fDayjs } from '../../../../modules/shared/infrastructure/helpers/format-time';
import RHFSwitch from '../../../../components/hook-form/rhf-switch';
import { RHFDate } from '../../../../components/hook-form/rhf-date';

type Props = {
    label: string
}

export const CertificateFormGeneral = ({ label }: Props) => {
    const { watch, setValue } = useFormContext();

    const hasServiceIncluded = watch("hasServiceIncluded");
    const isApplied = watch("isApplied");
    const executionDate = watch("executionDate") ?? null;

    useEffect(() => {
        if (isApplied && !executionDate) {
            setValue("executionDate", fDayjs(new Date()));
        }
        if (!isApplied) {
            setValue("executionDate", null);

        }
    }, [isApplied, executionDate]);

    if (!hasServiceIncluded) return <Alert sx={{ mt: 1 }} severity="warning">El servicio no está incluido en este contrato</Alert>

    return (
        <>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2} my={2}>
                <RHFSwitch
                    name="isApplied"
                    label={label}
                    style={{
                        width: "100%"
                    }}

                />
                {
                    isApplied &&
                    <RHFDate
                        name="executionDate"
                        value={executionDate}
                        label="Fecha de ejecución"
                    />
                }
            </Stack>

        </>
    );
};

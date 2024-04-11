import { useEffect } from "react";
import { Stack, Alert } from '@mui/material';
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
    const resultDate = watch("resultDate") ?? null;

    useEffect(() => {
        if (isApplied && !resultDate) {
            setValue("resultDate", fDayjs(new Date()));
        }
        if (!isApplied) {
            setValue("resultDate", null);

        }
    }, [isApplied, resultDate]);

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
                        name="resultDate"
                        value={resultDate}
                        label="Fecha de certificado"
                    />
                }
            </Stack>

        </>
    );
};

import { useEffect } from "react";
import { Stack } from '@mui/material';
import { useFormContext } from "react-hook-form";
import { fDayjs } from '../../../../modules/shared/infrastructure/helpers/format-time';
import RHFSwitch from '../../../../components/hook-form/rhf-switch';
import { RHFDate } from '../../../../components/hook-form/rhf-date';
import { RHFTextField } from "../../../../components/hook-form";

type Props = {
    label: string
}

export const CertificateFormGeneral = ({ label }: Props) => {
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
    }, [isApplied, resultDate]);


    return (
        <Stack>

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
                        value={fDayjs(resultDate)}
                        label="Fecha de certificado"
                    />
                }
            </Stack>
            <RHFTextField
                name="observation"
                label="Observaciones"
            />

        </Stack>
    );
};

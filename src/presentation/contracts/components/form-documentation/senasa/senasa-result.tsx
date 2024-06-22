import { useEffect } from "react";
import { Alert, Stack, } from '@mui/material';
import { useFormContext } from "react-hook-form";
import RHFSwitch from '../../../../../components/hook-form/rhf-switch';
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';

type Props = {
    senasaDocuments: DocumentationCertificate;
}

export const SENASAFormResult = ({ senasaDocuments }: Props) => {
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


    if (!senasaDocuments?.executionDate) return <Alert severity="info">Necesitas indicar la fecha de en que se presenta en senasa</Alert>

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
                {isApplied &&
                    <RHFDate
                        name="resultDate"
                        value={fDayjs(resultDate)}
                        label="Fecha de ejecución"
                    />
                }
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <RHFTextField
                    name='observation'
                    label="Observación"
                />
            </Stack>
        </>
    );
};

import { Stack } from '@mui/material';
import { useFormContext } from "react-hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';


export const SENASAFormGeneral = () => {
    const { watch } = useFormContext();

    const executionDate = fDayjs(watch("executionDate") ?? null);

    return (
        <>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <RHFDate
                    name="executionDate"
                    value={executionDate}
                    label="Fecha de para presentar en senasa"
                />
            </Stack>
        </>
    );
};

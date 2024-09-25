import { useFormContext } from "react-hook-form";
import { Divider, Stack, Typography } from "@mui/material";
import { RHFSwitch, RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { Pet } from '../../../../../modules/pets/domain/pet';
import { DoctorProvince } from "../doctor-province";

type Props = {
    title: string;
    pet?: Pet;
    hasServiceIncluded: boolean;
}

export const VaccinationFormGeneral = ({ title, hasServiceIncluded }: Props) => {
    const { watch } = useFormContext();
    const date = fDayjs(watch("date"));
    const executed = watch("executed");

    return (
        <>
            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Divider />
                {!hasServiceIncluded &&
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <RHFSwitch
                            name="executed"
                            label={`¿La mascota ya tiene la ${title}?`}
                        />
                    </Stack>
                }

                {(hasServiceIncluded || executed) &&
                    <>
                        <Typography fontWeight="bold">{title}</Typography>
                        <Stack spacing={2}>
                            <DoctorProvince />
                        </Stack>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <RHFDate
                                name="date"
                                value={date}
                                label={hasServiceIncluded ? "Fecha de la vacuna" : "Fecha de cuando aplicaron la vacuna"}
                            />

                            <RHFTextField
                                name="description"
                                label="Vacuna aplicada"
                            />
                        </Stack>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <RHFTextField
                                name="observation"
                                label="Observaciones"
                            />
                        </Stack>
                    </>
                }

            </Stack>
        </>
    );
};

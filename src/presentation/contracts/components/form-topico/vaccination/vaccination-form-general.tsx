import { useFormContext } from "react-hook-form";
import { Divider, Stack, Typography } from "@mui/material";
import { RHFSwitch, RHFTextField } from "../../../../../components/hook-form";
import { RHFDate } from '../../../../../components/hook-form/rhf-date';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TopicoSearchUser } from "../topico-search-user";
import { useEffect } from "react";
import { Pet } from '../../../../../modules/pets/domain/pet';
import { vaccinationType } from "./vaccination-validation";

type Props = {
    title: string;
    pet?: Pet;
}

export const VaccinationFormGeneral = ({ title, pet }: Props) => {
    const { watch, setValue } = useFormContext();
    const hasIncluded = watch("hasIncluded");
    const date = fDayjs(watch("date"));
    const executed = watch("executed");

    useEffect(() => {
        if (executed) {
            setValue("description", vaccinationType(pet?.type))
        } else {
            setValue("description", "")
        }
    }, [executed])

    return (
        <>
            <Stack flexWrap="wrap" spacing={1} marginBottom={3}>
                <Divider />
                {!hasIncluded &&
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                        <RHFSwitch
                            name="executed"
                            label={`¿La mascota ya tiene la ${title}?`}
                        />
                    </Stack>
                }

                {(hasIncluded || executed) &&
                    <>
                        <Typography fontWeight="bold">{title}</Typography>
                        <Stack spacing={2}>
                            <TopicoSearchUser />
                        </Stack>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                            <RHFDate
                                name="date"
                                value={date}
                                label={hasIncluded ? "Fecha de cuando aplicaron la vacuna" : "Fecha de la vacuna"}
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

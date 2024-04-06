import { FC } from "react";
import { Alert, Stack, Typography } from "@mui/material";
import RHFTextField from '../../../../../../components/hook-form/rhf-text-field';
import IconWrapper from '../../../../../../components/icon-wrapper/icon-wrapper';
import { useTravelGeneralForm } from "./use-travel-general-form";
import { RHFDate } from '../../../../../../components/hook-form/rhf-date';

type Props = {
    hasServiceIncluded: boolean;
}

export const TravelFormGeneral: FC<Props> = ({ hasServiceIncluded }) => {
    const { code, typeTraveling, departureDate, arrivalDate, editPermit } = useTravelGeneralForm();
    const edit = editPermit(hasServiceIncluded)

    return (
        <Stack spacing={1} my={1}>
            {hasServiceIncluded ?
                <Alert variant='outlined' sx={{ width: "100%" }} severity={code ? "success" : "warning"}>
                    {code
                        ? "Esa es la reserva ofrecida por Pet Travel, la cual forma parte integral de nuestros servicios, de acuerdo con los términos estipulados en su contrato."
                        : "Pet Travel se encargará de administrar la reserva como parte integral de nuestros servicios, conforme a lo estipulado en su contrato."
                    }

                </Alert>
                :
                <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>
                    Recuerda que el contrato no incluye la reserva con la aerolínea, encantado de apoyarte.
                </Alert>
            }

            <Typography>Reserva de aerolínea </Typography>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                <RHFTextField
                    name="airlineReservation.code"
                    label="Código de reserva (*)"
                    InputProps={{
                        readOnly: edit
                    }}
                    style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                />
                <RHFTextField
                    name="airlineReservation.flightNumber"
                    label="Número de vuelo (*)"
                    InputProps={{
                        readOnly: edit
                    }}
                    style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                />
            </Stack>
            <RHFTextField
                name="airlineReservation.departureAirport"
                label="Aeropuerto de salida (*)"
                InputProps={{
                    readOnly: edit
                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <RHFTextField
                name="airlineReservation.destinationAirport"
                label="Aeropuerto de llegada (*)"
                InputProps={{
                    readOnly: edit
                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                <RHFDate
                    name="airlineReservation.departureDate"
                    label="Fecha de salida (*)"
                    value={departureDate}
                    sx={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                />
                <RHFDate
                    name="airlineReservation.arrivalDate"
                    value={arrivalDate}
                    label="Fecha de llegada (*)"
                    sx={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                />
            </Stack>

            {
                typeTraveling === "accompanied" &&
                <Alert variant='outlined' sx={{ width: "100%" }} severity="info">
                    ¡Viaje acompañado! Usted está a cargo de viajar con su mascota.
                </Alert>
            }
            {
                typeTraveling === "charge" &&
                <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>
                    Viaje por cargo o bodega. Su mascota viajará de manera segura y cómoda.
                </Alert>
            }
        </Stack >
    );
}
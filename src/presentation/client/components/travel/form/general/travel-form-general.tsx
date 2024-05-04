import { FC } from "react";
import { Alert, Stack, Typography } from "@mui/material";
import RHFTextField from '../../../../../../components/hook-form/rhf-text-field';
import { useTravelGeneralForm } from "./use-travel-general-form";
import { RHFDate } from '../../../../../../components/hook-form/rhf-date';
import { DateTimePicker } from "@mui/x-date-pickers";
import { fDayjs } from '../../../../../../modules/shared/infrastructure/helpers/format-time';

type Props = {
    hasServiceIncluded: boolean;
}

export const TravelFormGeneral: FC<Props> = ({ hasServiceIncluded }) => {
    const { code, typeTraveling, departureDate, arrivalDate, editPermit } = useTravelGeneralForm();
    const readonly = editPermit(hasServiceIncluded)

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
                        readOnly: readonly
                    }}
                    style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                />
                <RHFTextField
                    name="airlineReservation.flightNumber"
                    label="Número de vuelo (*)"
                    InputProps={{
                        readOnly: readonly
                    }}
                    style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                />
            </Stack>
            <RHFTextField
                name="airlineReservation.departureAirport"
                label="Aeropuerto de salida (*)"
                InputProps={{
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <RHFTextField
                name="airlineReservation.destinationAirport"
                label="Aeropuerto de llegada (*)"
                InputProps={{
                    readOnly: readonly
                }}
                style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                {readonly ?
                    <>
                        <DateTimePicker value={fDayjs(departureDate)} label="Fecha de salida (*)" disabled sx={{ width: "100%" }} format='DD/MM/YYYY HH:mm:ss'
                        />
                        <DateTimePicker value={fDayjs(arrivalDate)} label="Fecha de llegada (*)" disabled sx={{ width: "100%" }} format='DD/MM/YYYY HH:mm:ss'
                        />
                    </>
                    :
                    <>
                        <RHFDate
                            name="airlineReservation.departureDate"
                            label="Fecha de salida (*)"
                            value={fDayjs(departureDate)}
                            format="DD/MM/YYYY HH:mm:ss"
                        />
                        <RHFDate
                            name="airlineReservation.arrivalDate"
                            value={fDayjs(arrivalDate)}
                            label="Fecha de llegada (*)"
                            format="DD/MM/YYYY HH:mm:ss"
                        />

                    </>


                }
            </Stack>

            {
                typeTraveling === "accompanied" &&
                <Alert variant='outlined' sx={{ width: "100%" }} severity="info">
                    ¡Viaje acompañado! Usted está a cargo de viajar con su mascota.
                </Alert>
            }
            {
                typeTraveling === "charge" &&
                <>
                    <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>
                        Viaje por cargo o bodega. Su mascota viajará de manera segura y cómoda.
                    </Alert>
                    <RHFTextField
                        name="guideNumber"
                        label="Número de Guía (*)"
                        InputProps={{
                            readOnly: readonly
                        }}
                        style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    />
                </>
            }
        </Stack >
    );
}
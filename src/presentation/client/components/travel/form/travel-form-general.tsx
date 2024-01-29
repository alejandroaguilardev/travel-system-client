import { FC } from "react";
import { Alert, Stack, Typography } from "@mui/material";
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { useFormContext } from 'react-hook-form';
import { TypeTraveling } from '../../../../../modules/contracts/domain/interfaces/travel';
import IconWrapper from '../../../../../components/icon-wrapper/icon-wrapper';

type Props = {
    readonly: boolean;
    user?: boolean;
}

const editPermit = (readonly: boolean, user?: boolean): boolean => {
    if (readonly) {
        if (user) return false;
        return readonly;
    }
    if (user) return true;

    return false;
}

export const TravelFormGeneral: FC<Props> = ({ user, readonly }) => {
    const edit = editPermit(readonly, user)
    const { watch } = useFormContext();
    const typeTraveling: TypeTraveling = watch('typeTraveling');
    const code: TypeTraveling = watch('airlineReservation.code');

    return (
        <Stack spacing={1} my={1}>
            {JSON.stringify(edit)}
            {readonly ?
                <Alert variant='outlined' sx={{ width: "100%" }} severity={code ? "success" : "warning"}>
                    {code
                        ? "Esa es la reserva ofrecida por Pet Travel, la cual forma parte integral de nuestros servicios, de acuerdo con los términos estipulados en su contrato."
                        : "Pet Travel se encargará de administrar la reserva como parte integral de nuestros servicios, conforme a lo estipulado en su contrato."
                    }

                </Alert>
                :
                <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>
                    Su contrato no incluye la responsabilidad de Pet Travel con respecto a la reserva y posibles problemas de viaje.
                </Alert>
            }

            <Typography>Reserva de aerolínea </Typography>
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
            <RHFTextField
                name="airlineReservation.departureDate"
                type="date"
                label="Fecha de salida (*)"
                InputProps={{
                    startAdornment: <IconWrapper icon="date" />,
                    readOnly: edit

                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <RHFTextField
                name="airlineReservation.arrivalDate"
                type="date"
                label="Fecha de llegada (*)"
                InputProps={{
                    startAdornment: <IconWrapper icon="date" />,
                    readOnly: edit,

                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />

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

            {
                typeTraveling === "charge" &&
                <>
                    <Typography>Reserva de aerolínea </Typography>
                    <RHFTextField
                        name="petPerCharge.receptor"
                        label="Receptor (*)"
                        InputProps={{
                            readOnly: edit
                        }}
                        style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    />
                    <RHFTextField
                        name="petPerCharge.phone"
                        label="Teléfono (*)"
                        InputProps={{
                            readOnly: edit
                        }}
                        style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    />
                    <RHFTextField
                        name="petPerCharge.email"
                        label="Correo Electrónico"
                        InputProps={{
                            readOnly: edit
                        }}
                        style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    />

                    <RHFTextField
                        name="petPerCharge.pickupDateTime"
                        type="date"
                        label="Fecha de recojo (*)"
                        InputProps={{
                            startAdornment: <IconWrapper icon="date" />
                        }}
                        style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    />
                    <RHFTextField
                        name="petPerCharge.pickupLocation"
                        label="Lugar de recojo (*)"
                        InputProps={{
                            readOnly: edit
                        }}
                        style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    />
                    <RHFTextField
                        name="petPerCharge.specialRequests"
                        label="Solitudes opcionales"
                        InputProps={{
                            readOnly: edit
                        }}
                        style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                    />
                </>
            }
        </Stack >
    );
}
import React, { useEffect, useState } from 'react';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status';
import {
    Typography,
    Divider,
    Card,
    CardContent,
    Button,
    Box,
    Grid,
} from '@mui/material';
import { statusColor } from '../../table/status-color';
import Label from 'src/components/label';
import { useDetailInfoContext } from '../../../context/contract-detail-context';
import { fDateTimeLong } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { useMessage } from 'src/hooks';
import { getImage } from '../../../../../modules/shared/infrastructure/upload/upload-image';
import { downloadFile } from '../../../../../modules/shared/infrastructure/helpers/blob-archive';
import { getFile } from '../../../../../modules/shared/infrastructure/upload/upload-file';
import { TRAVEL_TYPES } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import Image from 'src/components/image/image';
import { HOST_ASSETS_IMAGES } from 'src/app/config/config-global';

export const ContractDetailTravel: React.FC = () => {
    const { contract } = useDetailInfoContext();
    const { showNotification } = useMessage();
    const [imagesSrc, setImagesSrc] = useState<string[]>([])


    useEffect(() => {
        const fetchImage = async () => {
            const promises = contract.details.map(detail => getImage(detail?.travel?.accompaniedPet?.image ?? "", "arraybuffer", "private"));
            const results = await Promise.allSettled(promises);
            setImagesSrc(results.map((_: any) => _?.value?.image ?? ""));

        };

        fetchImage();
    }, [contract.details]);



    const downloadImage = (name?: string) => {
        if (!name) return;
        getImage(name, 'stream', "private").then((response) => {
            downloadFile(new Blob([response.image]), response?.name ?? "");
        }).catch((e) => {
            console.log(e);
            showNotification("No se logró descargar el archivo", { variant: "error" });
        });
    };

    const downloadReserve = (name: string) => {
        if (!name) return;
        getFile(name).then((response) => {
            const archive = response.file;
            downloadFile(new Blob([archive]), response.name);
        }).catch((e) => {
            console.log(e);
            showNotification("No se logró descargar el archivo", { variant: "error" });
        });
    };

    const downloadImagePet = (name: string) => {
        if (!name) return;
        getImage(name, "stream", "public").then(({ image }) => {
            const archive = image;
            downloadFile(new Blob([archive]), "mascota.png");
        }).catch((e) => {
            console.log(e);
            showNotification("No se logró descargar el archivo", { variant: "error" });
        });
    };



    return (
        <>
            {contract.details.map((detail, index) => (
                <Card sx={{ my: 3, boxShadow: 3, borderRadius: 2 }} key={`${detail.id}`}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                            color="chocolate"
                        >
                            {detail.pet?.name
                                ? `${detail.pet.name} (Microchip: ${detail.pet.chip || "No disponible"})`
                                : `Mascota número ${index + 1}: (Pendiente de admisión)`}
                        </Typography>

                        <Label
                            color={statusColor(detail?.travel?.status)}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                p: 2,
                                mb: 1,
                                fontSize: '0.875rem',
                                width: "100%"
                            }}
                        >
                            NIVEL DE PROGRESO DEL CLIENTE {CONTRACT_STATUS.find(_ => _.value === detail.travel?.status)?.label}
                        </Label>

                        <Typography variant="body1">
                            <strong>Tipo de Viaje:</strong>
                            {TRAVEL_TYPES.find((_) => _.value === detail.travel.typeTraveling)?.label}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1">
                            <strong>Reserva:</strong>
                            {detail.travel.airlineReservation.code
                                ? detail.travel.airlineReservation.code
                                : <span style={{ color: "red" }}> Reserva no disponible</span>}
                            <span style={{ marginLeft: "2rem" }}>
                                N° {detail.travel.airlineReservation.flightNumber || <span style={{ color: "red" }}> no disponible</span>}
                            </span>
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body1">
                            <strong>Salida:</strong>
                            {detail.travel.airlineReservation.departureDate
                                ? `${fDateTimeLong(detail.travel.airlineReservation.departureDate)} ${capitalize(detail.travel.airlineReservation.departureAirport)}`
                                : <span style={{ color: "red" }}> Salida no disponible</span>}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body1">
                            <strong>Llegada:</strong>
                            {detail.travel.airlineReservation?.arrivalDate
                                ? `${fDateTimeLong(detail.travel.airlineReservation?.arrivalDate)} ${capitalize(detail.travel.airlineReservation?.destinationAirport)}`
                                : <span style={{ color: "red" }}> Llegada no disponible</span>}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body1">
                            <strong>Itinerario:</strong>
                            {detail.travel.airlineReservation?.itinerary
                                ? detail.travel.airlineReservation?.itinerary
                                : <span style={{ color: "red" }}> Itinerario no disponible</span>}
                        </Typography>

                        <Box display="flex" mb={4} justifyContent="center" gap={2}>
                            {detail?.travel?.airlineReservation.archive ? (
                                <Button variant='contained' color="success" onClick={() => downloadReserve(detail.travel.airlineReservation.archive)}>
                                    Ver adjunto PDF de viaje
                                </Button>
                            ) : (
                                <Button variant='contained' disabled>
                                    No se ha adjuntado el PDF de viaje
                                </Button>
                            )}
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1">
                            <strong>Datos del Acompañante:</strong>
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Grid container gap={2}>
                            <Grid item md={5}>
                                <Typography variant="body1">
                                    <strong>Documento:</strong>
                                    {detail.travel.accompaniedPet?.document
                                        ? `${detail.travel.accompaniedPet.document} ${detail.travel.accompaniedPet.documentNumber}`
                                        : <span style={{ color: "red" }}>Documento no disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>Nombre:</strong>
                                    {detail.travel.accompaniedPet?.name
                                        ? detail.travel.accompaniedPet.name
                                        : <span style={{ color: "red" }}>Nombre no disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>Correo:</strong>
                                    {detail.travel.accompaniedPet?.email
                                        ? detail.travel.accompaniedPet.email
                                        : <span style={{ color: "red" }}>Correo no disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>Teléfono:</strong>
                                    {detail.travel.accompaniedPet?.phone
                                        ? detail.travel.accompaniedPet.phone
                                        : <span style={{ color: "red" }}>Teléfono no disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>Departamento:</strong>
                                    {detail.travel.accompaniedPet?.department
                                        ? detail.travel.accompaniedPet.department
                                        : <span style={{ color: "red" }}>No disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography variant="body1">
                                    <strong>Provincia:</strong>
                                    {detail.travel.accompaniedPet?.province
                                        ? detail.travel.accompaniedPet.province
                                        : <span style={{ color: "red" }}>No disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>Distrito:</strong>
                                    {detail.travel.accompaniedPet?.district
                                        ? detail.travel.accompaniedPet.district
                                        : <span style={{ color: "red" }}>No disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>Dirección:</strong>
                                    {detail.travel.accompaniedPet?.direction
                                        ? detail.travel.accompaniedPet.direction
                                        : <span style={{ color: "red" }}>Dirección no disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="body1" color="textSecondary">
                                    <strong>Servicio de Acompañamiento:</strong>
                                    {detail.travel.hasServiceAccompanied
                                        ? "El servicio de acompañamiento está incluido para llevar al cliente al aeropuerto."
                                        : "El servicio de acompañamiento no está incluido."}
                                </Typography>
                                <Divider sx={{ my: 2 }} />


                                {detail.travel.typeTraveling === "accompanied" && (
                                    <Typography variant="body1" color="textSecondary">
                                        <strong>Nota:</strong> El acompañante viajará con el cliente y no será enviado por cargo.
                                    </Typography>
                                )}
                                <Divider sx={{ my: 2 }} />

                                <Typography variant="body1">
                                    <strong>Observación:</strong> {detail.travel.observation}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                            </Grid>
                            <Grid item md={3}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Image
                                        alt="Ver Pasaporte"
                                        src={imagesSrc[0] ?? ""}
                                        objectFit='contain'
                                        sx={{
                                            width: 1,
                                            height: 400,
                                            borderRadius: 1,
                                            mb: 2
                                        }}
                                    />
                                    {detail?.travel?.accompaniedPet?.image ? (
                                        <Button variant='contained' color="success" onClick={() => downloadImage(detail.travel.accompaniedPet.image)} fullWidth>
                                            Descargar archivo adjuntado del pasaporte
                                        </Button>
                                    ) : (
                                        <Button variant='contained' disabled fullWidth>
                                            El archivo del pasaporte no ha sido adjuntado
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item md={3}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Image
                                        alt="Ver Mascota"
                                        src={`${HOST_ASSETS_IMAGES}/${detail.pet?.image}`}
                                        objectFit='contain'
                                        sx={{
                                            width: 1,
                                            height: 400,
                                            borderRadius: 1,
                                            mb: 2
                                        }}
                                    />
                                    {detail?.travel?.airlineReservation.archive ? (
                                        <Button variant='contained' color="success" onClick={() => downloadImagePet(detail?.pet?.image ?? "")} fullWidth>
                                            Descarga la imagen adjuntada de la mascota
                                        </Button>
                                    ) : (
                                        <Button variant='contained' disabled fullWidth>
                                            La imagen de la mascota no ha sido adjuntada
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                        {detail.travel.typeTraveling === "charge" && (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body1">
                                    <strong>Datos de Cargo:</strong>
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>Receptor:</strong>
                                    {detail.travel.petPerCharge?.name
                                        ? capitalize(detail.travel.petPerCharge.name)
                                        : <span style={{ color: "red" }}>Receptor no disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>E-mail:</strong>
                                    {detail.travel.petPerCharge?.email
                                        ? capitalize(detail.travel.petPerCharge.email)
                                        : <span style={{ color: "red" }}>E-mail no disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 1 }} />

                                <Typography variant="body1">
                                    <strong>Teléfono:</strong>
                                    {detail.travel.petPerCharge?.phone
                                        ? capitalize(detail.travel.petPerCharge.phone)
                                        : <span style={{ color: "red" }}>Teléfono no disponible</span>}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                            </>
                        )}
                    </CardContent>
                </Card >
            ))}
        </>
    );
};

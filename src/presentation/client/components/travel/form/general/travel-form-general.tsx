import { FC, useEffect } from "react";
import { Alert, Stack, Typography, InputAdornment, TextField, Button } from '@mui/material';
import RHFTextField from '../../../../../../components/hook-form/rhf-text-field';
import { useTravelGeneralForm } from "./use-travel-general-form";
import { RHFDate } from '../../../../../../components/hook-form/rhf-date';
import { DateTimePicker } from "@mui/x-date-pickers";
import { fDayjs } from '../../../../../../modules/shared/infrastructure/helpers/format-time';
import Iconify from '../../../../../../components/iconify/iconify';
import Upload from '../../../../../../components/upload/upload';
import { useLoadImage } from '../../../../../../hooks/use-load-image';
import { Pet } from '../../../../../../modules/pets/domain/pet';
import { useFileImageStore } from '../../../../../../state/upload/file-image-store';
import { useFileStore } from "../../../../../../state/upload/file-store";
import { downloadFile } from '../../../../../../modules/shared/infrastructure/helpers/blob-archive';
import { AutocompleteAirportSelect } from "./airport-select";

type Props = {
    hasServiceIncluded: boolean;
    pet?: Pet;
    readonly: boolean;
    archiveFile: { file: File | null, name: string };
    estimateDate: Date,
}

export const TravelFormGeneral: FC<Props> = ({ readonly, hasServiceIncluded, pet, archiveFile, estimateDate }) => {
    const { code, typeTraveling, departureDate, arrivalDate } = useTravelGeneralForm();
    const { imageFile } = useLoadImage("arraybuffer", "public", pet?.image);
    const { file, onChangeFile } = useFileStore();
    const { fileImage, onChangeImageFile } = useFileImageStore();

    const handleDownload = () => {
        if (!archiveFile?.file) return;
        const archive = file || archiveFile.file;
        downloadFile(new Blob([archive]), archiveFile.name);

    }

    useEffect(() => {
        onChangeImageFile(null);
        onChangeFile(null);
    }, []);

    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
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
                <Stack direction={{ xs: "column", md: "row" }} spacing={1} mb={2}>
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
                <Stack direction={{ xs: "column", md: "row" }} spacing={1} mb={2}>
                    {
                        readonly
                            ? <RHFTextField
                                name="airlineReservation.departureAirport"
                                label="Aeropuerto de salida (*)"
                                InputProps={{ readOnly: readonly }}
                                style={{ pointerEvents: 'none', opacity: 0.5 }}
                            />
                            : <AutocompleteAirportSelect
                                name="airlineReservation.departureAirport"
                                label="Aeropuerto de salida (*)"
                            />
                    }
                    {
                        readonly
                            ? <RHFTextField
                                name="airlineReservation.destinationAirport"
                                label="Aeropuerto de llegada (*)"
                                InputProps={{ readOnly: readonly }}
                                style={{ pointerEvents: 'none', opacity: 0.5 }}
                            />
                            : <AutocompleteAirportSelect
                                name="airlineReservation.destinationAirport"
                                label="Aeropuerto de llegada (*)"
                            />
                    }
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={1} mb={2}>
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
                                minDate={fDayjs(estimateDate)}
                            />
                            <RHFDate
                                name="airlineReservation.arrivalDate"
                                value={fDayjs(arrivalDate)}
                                label="Fecha de llegada (*)"
                                minDate={fDayjs(estimateDate)}
                            />

                        </>
                    }
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
                    <RHFTextField
                        name="airlineReservation.itinerary"
                        label="Itinerario (Indicar Trayecto) (*)"
                        placeholder="Lima-Bogota-Madrid"
                        InputProps={{
                            readOnly: readonly,
                            startAdornment: <InputAdornment position="start">
                                <Iconify icon="mdi:text" />
                            </InputAdornment>
                        }}
                        style={readonly ? { pointerEvents: 'none', opacity: 0.5 } : {}}
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

            </Stack>
            <Stack display="flex" mb={4}>
                <Stack mb={4}>
                    <Typography variant='h6'>Suba el PDF o imagen de la reserva de su aerolínea (*)
                    </Typography>
                    {
                        archiveFile?.file &&
                        <Button onClick={handleDownload} variant="outlined" color="info">Descargar comprobante</Button>
                    }
                    <TextField
                        type="file"
                        onChange={({ target }: any) => {
                            if (!target.files[0]) return;
                            onChangeFile(target.files[0] as File ?? null)

                        }}
                        inputProps={{
                            accept: "image/*,application/pdf"
                        }}

                    />
                </Stack>
                <Stack>
                    <Typography variant='h6'>Suba una foto de su mascota (*)</Typography>
                    <Upload
                        file={fileImage || imageFile}
                        onDrop={(value) => onChangeImageFile(value[0])}
                        accept={{
                            'image/jpeg': ['.jpeg', '.jpg'],
                            'image/png': ['.png'],
                            'image/gif': ['.gif'],
                            'image/svg+xml': ['.svg']
                        }} sx={{
                            height: "100%"
                        }}
                        onDelete={() => onChangeImageFile(null)}
                        maxSize={26214400} />
                </Stack>
            </Stack>
        </Stack>

    );
}

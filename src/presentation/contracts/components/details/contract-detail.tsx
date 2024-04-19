import React from 'react';
import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Divider,
    useTheme,
    Box,
    Paper,
} from '@mui/material';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { fDateTimeLong } from '../../../../modules/shared/infrastructure/helpers/format-time';
import Label from '../../../../components/label/label';
import { statusColor } from '../table/status-color';
import { TRAVEL_TYPES } from '../../../../modules/contracts/domain/contract-services/travel/contract-travel';

interface ContractDetailsProps {
    contract: Contract;
}

const ContractDetails: React.FC<ContractDetailsProps> = ({ contract }) => {
    const { back } = useRouter();
    const theme = useTheme();

    return (
        <>
            <Paper
                sx={{
                    p: 3,
                    my: 3,
                }}>

                <Typography variant="h5" gutterBottom>
                    Detalles del Contrato
                </Typography>
                <Divider sx={{ marginBottom: theme.spacing(2) }} />

                <Table sx={{ width: "100%" }}>
                    <TableBody>
                        <TableRow hover>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Número de Contrato:
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography>{contract.number}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Fecha de Inicio:
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography>{fDateTimeLong(contract.startDate)}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Fecha de Finalización:
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography>{contract.endDate ? fDateTimeLong(contract.endDate) : "--"}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Cliente:
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography>{contract.client.profile.document} {contract.client.profile.documentNumber}</Typography>
                                <Divider />
                                <Typography>{contract.client.profile.name} {contract.client.profile.lastName}</Typography>
                                <Divider />
                                <Typography>E-mail: {contract.client.email} </Typography>
                                <Divider />
                                <Typography>Teléfono: {contract.client.profile.phone} </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell sx={{ width: "50%" }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Estado:
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ width: "50%" }}>
                                <Label color={statusColor(contract.status)}>
                                    {CONTRACT_STATUS.find(_ => _.value === contract.status)?.label}
                                </Label>
                            </TableCell>
                        </TableRow>
                        {contract?.reasonForCancellation && contract.status === "canceled" &&
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Estado:
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    {contract?.reasonForCancellation}
                                </TableCell>
                            </TableRow>
                        }

                    </TableBody>
                </Table>
            </Paper>

            {contract.details.map(detail => (
                <Paper
                    sx={{
                        p: 3,
                        my: 3,
                    }} key={`${detail.id}`}>
                    <Typography variant="subtitle1" gutterBottom >
                        {detail?.pet?.name}
                    </Typography>
                    <Divider sx={{ marginY: theme.spacing(2) }} />
                    <Typography variant="subtitle1" gutterBottom >
                        Servicio de Documentación
                    </Typography>
                    <Table sx={{ width: "100%" }}>
                        <TableBody>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Estado:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    <Label color={statusColor(contract.status)}>
                                        {CONTRACT_STATUS.find(_ => _.value === detail.documentation.status)?.label}
                                    </Label>
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Certificado de vacuna:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.vaccinationCertificate.resultDate ? fDateTimeLong(detail.documentation.vaccinationCertificate.resultDate) : "--"} </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Certificado de salud:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.healthCertificate.resultDate ? fDateTimeLong(detail.documentation.healthCertificate.resultDate) : "--"} </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Certificado de chip:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.chipCertificate.resultDate ? fDateTimeLong(detail.documentation.chipCertificate.resultDate) : "--"} </TableCell>
                            </TableRow>

                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Documentos de SENASA:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.senasaDocuments.resultDate ? fDateTimeLong(detail.documentation.senasaDocuments.resultDate) : "--"} </TableCell>
                            </TableRow>

                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Test serológico de rabia:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.rabiesSeroLogicalTest.resultDate ? fDateTimeLong(detail.documentation.rabiesSeroLogicalTest.resultDate) : "--"}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Permiso de importación:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.importLicense.resultDate ? fDateTimeLong(detail.documentation.importLicense.resultDate) : "--"}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Certificado de soporte emocional:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.emotionalSupportCertificate.resultDate ? fDateTimeLong(detail.documentation.emotionalSupportCertificate.resultDate) : "--"}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                    <Divider sx={{ marginY: theme.spacing(2) }} />

                    <Typography variant="subtitle1" gutterBottom>
                        Servicio de Jaula
                    </Typography>
                    <Table sx={{ width: "100%" }}>
                        <TableBody>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Estado:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    <Label color={statusColor(contract.status)}>
                                        {CONTRACT_STATUS.find(_ => _.value === detail.cage.status)?.label}
                                    </Label>
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Selección de Jaula:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    Tipo: {capitalize(detail.cage.chosen.typeCage)}
                                    <Divider />
                                    Modelo: {capitalize(detail.cage.chosen.modelCage)} {" "}
                                    <Divider />
                                    Dimensión: {capitalize(detail.cage.chosen.dimensionsCage)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Divider sx={{ marginY: theme.spacing(2) }} />

                    <Typography variant="subtitle1" gutterBottom>
                        Servicio de Viaje
                    </Typography>
                    <Table sx={{ width: "100%" }}>
                        <TableBody>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Estado:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    <Label color={statusColor(contract.status)}>
                                        {CONTRACT_STATUS.find(_ => _.value === detail.travel.status)?.label}
                                    </Label>
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Tipo de viaje:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    {TRAVEL_TYPES.find((_) => _.value === detail.travel.typeTraveling)?.label}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Reserva:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    {detail.travel.airlineReservation.code}
                                    {" "}
                                    N° {detail.travel.airlineReservation.flightNumber}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Salida:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    {detail.travel.airlineReservation.departureDate ? fDateTimeLong(detail.travel.airlineReservation.departureDate) : "--"}
                                    {capitalize(detail.travel.airlineReservation.departureAirport)}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Llegada:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    {detail.travel.airlineReservation?.arrivalDate ? fDateTimeLong(detail.travel.airlineReservation?.arrivalDate) : "--"}
                                    {capitalize(detail.travel.airlineReservation?.destinationAirport)}
                                </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Datos del acompañante:</TableCell>
                                <TableCell sx={{ width: "50%" }}>
                                    Documento: {detail.travel.accompaniedPet?.document}  {detail.travel.accompaniedPet?.documentNumber}
                                    <Divider />
                                    Nombre: {detail.travel.accompaniedPet?.name}
                                    <Divider />
                                    Correo: {detail.travel.accompaniedPet?.email}
                                    <Divider />
                                    teléfono: {detail.travel.accompaniedPet?.phone}
                                    <Divider />
                                    Dirección: {detail.travel.accompaniedPet?.direction}
                                </TableCell>
                            </TableRow>
                            {detail.travel.typeTraveling == "charge" &&
                                <>
                                    <TableRow hover>
                                        <TableCell sx={{ width: "50%" }}>Datos de cargo:</TableCell>
                                        <TableCell sx={{ width: "50%" }}>
                                            Receptor: {capitalize(detail.travel.petPerCharge?.name)}
                                            <Divider />
                                            E-mail: {capitalize(detail.travel.petPerCharge?.email)}
                                            <Divider />
                                            Teléfono: {capitalize(detail.travel.petPerCharge?.phone)}
                                        </TableCell>
                                    </TableRow>
                                </>
                            }

                        </TableBody>
                    </Table>
                    <Divider sx={{ marginY: theme.spacing(2) }} />

                    <Box width="100%" display="flex" justifyContent="center">
                        <Button variant="outlined" onClick={back}>
                            Volver Atrás
                        </Button>
                    </Box>
                </Paper>
            ))
            }
        </ >
    );
};

export default ContractDetails;

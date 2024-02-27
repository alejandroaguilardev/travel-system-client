import React, { Fragment } from 'react';
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
} from '@mui/material';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { PaperCustom } from '../../../../components/paper/paper-custom';
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
        <PaperCustom>
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

                </TableBody>
            </Table>
            {contract.details.map(detail => (
                <Fragment key={`${detail.id}`}>
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
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.vaccinationCertificate.executionDate ? fDateTimeLong(detail.documentation.vaccinationCertificate.executionDate) : "--"} </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Certificado de salud:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.healthCertificate.executionDate ? fDateTimeLong(detail.documentation.healthCertificate.executionDate) : "--"} </TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Certificado de chip:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.chipCertificate.executionDate ? fDateTimeLong(detail.documentation.chipCertificate.executionDate) : "--"} </TableCell>
                            </TableRow>

                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Documentos de SENASA:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.senasaDocuments.executionDate ? fDateTimeLong(detail.documentation.senasaDocuments.executionDate) : "--"} </TableCell>
                            </TableRow>

                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Test serológico de rabia:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.rabiesSeroLogicalTest.executionDate ? fDateTimeLong(detail.documentation.rabiesSeroLogicalTest.executionDate) : "--"}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Permiso de importación:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.importLicense.executionDate ? fDateTimeLong(detail.documentation.importLicense.executionDate) : "--"}</TableCell>
                            </TableRow>
                            <TableRow hover>
                                <TableCell sx={{ width: "50%" }}>Fecha de Certificado de soporte emocional:</TableCell>
                                <TableCell sx={{ width: "50%" }}>{detail.documentation.emotionalSupportCertificate.executionDate ? fDateTimeLong(detail.documentation.emotionalSupportCertificate.executionDate) : "--"}</TableCell>
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
                            {detail.travel.typeTraveling == "charge" &&
                                <>
                                    <TableRow hover>
                                        <TableCell sx={{ width: "50%" }}>Datos de cargo:</TableCell>
                                        <TableCell sx={{ width: "50%" }}>
                                            Receptor: {capitalize(detail.travel.petPerCharge?.receptor)}
                                            <Divider />
                                            E-mail: {capitalize(detail.travel.petPerCharge?.email)}
                                            <Divider />
                                            Teléfono: {capitalize(detail.travel.petPerCharge?.phone)}
                                            <Divider />
                                            Recojo: {capitalize(detail.travel.petPerCharge?.pickupLocation)}
                                            <Divider />
                                            Fecha de recojo: {fDateTimeLong(detail.travel.petPerCharge?.pickupDateTime)}
                                            <Divider />
                                            Comentarios: {capitalize(detail.travel.petPerCharge?.specialRequests || "--")}
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
                </Fragment>
            ))
            }
        </PaperCustom >
    );
};

export default ContractDetails;

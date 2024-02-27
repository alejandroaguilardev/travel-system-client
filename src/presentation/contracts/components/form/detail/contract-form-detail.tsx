import { Fragment } from 'react';
import { Divider, Stack, Table, TableBody, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { NewContract } from '../../../../../modules/contracts/domain/contract';
import { fDateTimeLong } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { TRAVEL_TYPES } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import Label from '../../../../../components/label';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import { useClientDialogContext } from '../../../../client/components/search-client/client-dialog-context';

const getColor = (value: boolean) => value ? "success" : "error";

export const ContractFormDetail = () => {
    const theme = useTheme();
    const { getValues } = useFormContext<NewContract>();
    const contract = getValues();
    const { client } = useClientDialogContext();

    return (
        <Stack spacing={1} marginBottom={2}>
            <Stack spacing={1} marginBottom={1}>
                <Typography fontWeight="bold">Detalles del contrato:</Typography>
                <Divider />
                <Table>
                    <TableBody>
                        <TableRow hover>
                            <TableCell sx={{ width: "50%" }}>
                                Número de Contrato:
                            </TableCell>
                            <TableCell sx={{ width: "50%" }}>
                                {contract.number}
                            </TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell sx={{ width: "50%" }}>
                                Fecha de Inicio:
                            </TableCell>
                            <TableCell sx={{ width: "50%" }}>
                                {fDateTimeLong(contract.startDate)}
                            </TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell sx={{ width: "50%" }} >
                                Seleccionar Cliente:
                            </TableCell>
                            <TableCell sx={{ width: "50%" }}>
                                {client?.profile.name} {client?.profile.lastName}
                                <Divider />
                                {client?.profile.document} {client?.profile.documentNumber}

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
                                    <TableCell sx={{ width: "50%" }}>Certificado de vacuna:</TableCell>
                                    <TableCell sx={{ width: "50%" }}>
                                        <Label color={getColor(detail.documentation.vaccinationCertificate.hasServiceIncluded)}>
                                            {detail.documentation.vaccinationCertificate.hasServiceIncluded ? "Incluido" : "No Incluido"}
                                        </Label>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell sx={{ width: "50%" }}>Certificado de salud:</TableCell>
                                    <TableCell sx={{ width: "50%" }}>
                                        <Label color={getColor(detail.documentation.healthCertificate.hasServiceIncluded)}>
                                            {detail.documentation.healthCertificate.hasServiceIncluded ? "Incluido" : "No Incluido"}
                                        </Label>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell sx={{ width: "50%" }}>Certificado de chip:</TableCell>
                                    <TableCell>
                                        <Label color={getColor(detail.documentation.chipCertificate.hasServiceIncluded)}>
                                            {detail.documentation.chipCertificate.hasServiceIncluded ? "Incluido" : "No Incluido"}
                                        </Label>
                                    </TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell sx={{ width: "50%" }}>Documentos de SENASA:</TableCell>
                                    <TableCell>
                                        <Label color={getColor(detail.documentation.senasaDocuments.hasServiceIncluded)}>
                                            {detail.documentation.senasaDocuments.hasServiceIncluded ? "Incluido" : "No Incluido"}
                                        </Label>
                                    </TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell sx={{ width: "50%" }}>Test serológico de rabia:</TableCell>

                                    <TableCell>
                                        <Label color={getColor(detail.documentation.rabiesSeroLogicalTest.hasServiceIncluded)}>
                                            {detail.documentation.rabiesSeroLogicalTest.hasServiceIncluded ? "Incluido" : "No Incluido"}
                                        </Label>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell sx={{ width: "50%" }}>Permiso de importación:</TableCell>
                                    <TableCell>
                                        <Label color={getColor(detail.documentation.importLicense.hasServiceIncluded)}>
                                            {detail.documentation.importLicense.hasServiceIncluded ? "Incluido" : "No Incluido"}
                                        </Label>
                                    </TableCell>
                                </TableRow>
                                <TableRow hover>
                                    <TableCell sx={{ width: "50%" }}>Certificado de soporte emocional:</TableCell>
                                    <TableCell>
                                        <Label color={getColor(detail.documentation.emotionalSupportCertificate.hasServiceIncluded)}>
                                            {detail.documentation.emotionalSupportCertificate.hasServiceIncluded ? "Incluido" : "No Incluido"}
                                        </Label>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                        <Divider sx={{ marginY: theme.spacing(2) }} />

                        <Typography variant="subtitle1" gutterBottom>
                            Servicio de Jaula
                        </Typography>
                        <Table sx={{ width: "100%" }}>
                            <TableBody>
                                {detail.cage?.hasServiceIncluded ?
                                    <TableRow hover>
                                        <TableCell sx={{ width: "50%" }}>Selección de Jaula:</TableCell>
                                        <TableCell sx={{ width: "50%" }}>
                                            Tipo: {capitalize(detail.cage?.chosen.dimensionsCage)}
                                            <Divider />
                                            Modelo: {capitalize(detail.cage?.chosen?.modelCage)}
                                            <Divider />
                                            Dimensión: {capitalize(detail.cage?.chosen?.dimensionsCage)}
                                        </TableCell>
                                    </TableRow>
                                    :
                                    <TableRow hover>
                                        <TableCell sx={{ width: "50%" }}>Recomendación de Jaula:</TableCell>
                                        <TableCell sx={{ width: "50%" }}>
                                            Tipo: {capitalize(detail.cage?.recommendation?.dimensionsCage)}
                                            <Divider />
                                            Modelo: {capitalize(detail.cage?.recommendation?.modelCage)}
                                            <Divider />
                                            Dimensión: {capitalize(detail.cage?.recommendation?.dimensionsCage)}
                                        </TableCell>
                                    </TableRow>

                                }
                            </TableBody>
                        </Table>
                        <Divider sx={{ marginY: theme.spacing(2) }} />

                        <Typography variant="subtitle1" gutterBottom>
                            Servicio de Viaje
                        </Typography>
                        <Table sx={{ width: "100%" }}>
                            <TableBody>
                                <TableRow hover>
                                    <TableCell sx={{ width: "50%" }}>Tipo de viaje:</TableCell>
                                    <TableCell sx={{ width: "50%" }}>
                                        {TRAVEL_TYPES.find((_) => _.value === detail.travel.typeTraveling)?.label}
                                    </TableCell>
                                </TableRow>

                                <TableRow hover>
                                    <TableCell sx={{ width: "50%" }}>Servicio de acompañamiento al aeropuerto</TableCell>
                                    <TableCell sx={{ width: "50%" }}>
                                        <Label color={getColor(detail.travel.hasServiceAccompanied)}>
                                            {detail.travel.hasServiceAccompanied
                                                ? "SI"
                                                : "NO"
                                            }
                                        </Label>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                        <Divider sx={{ marginY: theme.spacing(2) }} />
                    </Fragment>
                ))
                }
            </Stack>
        </Stack >
    )
}

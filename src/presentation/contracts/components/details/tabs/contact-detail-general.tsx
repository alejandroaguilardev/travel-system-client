import React from 'react';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status';
import {
    Typography,
    Divider,
    Grid,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import { statusColor } from '../../table/status-color';
import Label from 'src/components/label';
import { useDetailInfoContext } from '../../../context/contract-detail-context';
import { fDateTimeLong } from '../../../../../modules/shared/infrastructure/helpers/format-time';

export const ContractDetailGeneral: React.FC = () => {
    const { contract } = useDetailInfoContext();
    const statusLabel = CONTRACT_STATUS.find(_ => _.value === contract.status.petTravel)?.label;
    const statusClientLabel = CONTRACT_STATUS.find(_ => _.value === contract.status.client)?.label;

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Label
                                color={statusColor(contract?.status?.petTravel)}
                                sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    p: 2,
                                    mb: 1,
                                    fontSize: '0.875rem',
                                    width: "100%"
                                }}
                            >
                                CONDICIÓN DEL DOCUMENTACIÓN {CONTRACT_STATUS.find(_ => _.value === contract?.status?.petTravel)?.label}
                            </Label>

                            <Label
                                color={statusColor(contract?.status?.client)}
                                sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    p: 2,
                                    mb: 1,
                                    fontSize: '0.875rem',
                                    width: "100%"
                                }}
                            >
                                NIVEL DE PROGRESO DEL CLIENTE {CONTRACT_STATUS.find(_ => _.value === contract?.status?.client)?.label}
                            </Label>

                            {contract?.reasonForCancellation && contract.status.petTravel === "canceled" && (
                                <Stack spacing={1}>
                                    <Divider sx={{ marginBottom: 2 }} />
                                    <Typography><strong>Razón de Cancelación:</strong> {contract.reasonForCancellation}</Typography>
                                </Stack>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Información del Contrato
                            </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Stack spacing={1}>
                                <Typography><strong>Número de contrato:</strong> {contract.correlative || "--"}</Typography>
                                <Typography><strong>Carpeta:</strong> {contract.folder || "--"}</Typography>
                                <Typography><strong>Número en carpeta:</strong> {contract.number || "--"}</Typography>
                                <Typography><strong>Fecha de Inicio:</strong> {fDateTimeLong(contract.startDate)}</Typography>
                                <Typography><strong>Fecha de Finalización:</strong> {contract.endDate ? fDateTimeLong(contract.endDate) : "--"}</Typography>
                                <Typography><strong>Fecha Tentativa de Viaje:</strong> {contract.estimatedDate ? fDateTimeLong(contract.estimatedDate) : "--"}</Typography>
                                <Typography><strong>Precio:</strong> {contract.price ? `$${contract.price}` : "--"}</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Información del cliente (columna completa) */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Información del Cliente
                            </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Stack spacing={1}>
                                <Typography><strong>Documento:</strong> {`${contract.client.profile.document} ${contract.client.profile.documentNumber}`}</Typography>
                                <Typography><strong>Nombre Completo:</strong> {capitalize(contract.client.profile.name)} {contract.client.profile.lastName}</Typography>
                                <Typography><strong>Correo Electrónico:</strong> {contract.client.email || "--"}</Typography>
                                <Typography><strong>Teléfono:</strong> {contract.client.profile.phone || "--"}</Typography>
                                <Typography><strong>Estado del Cliente:</strong> {contract.client.status || "--"}</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Información del asesor (columna completa) */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Información del Asesor
                            </Typography>
                            <Divider sx={{ marginBottom: 2 }} />
                            <Stack spacing={1}>
                                <Typography><strong>Documento:</strong> {`${contract.adviser.profile.document} ${contract.adviser.profile.documentNumber}`}</Typography>
                                <Typography><strong>Nombre Completo:</strong> {capitalize(contract.adviser.profile.name)} {contract.adviser.profile.lastName}</Typography>
                                <Typography><strong>Correo Electrónico:</strong> {contract.adviser.email || "--"}</Typography>
                                <Typography><strong>Teléfono:</strong> {contract.adviser.profile.phone || "--"}</Typography>
                                <Typography><strong>Estado del Asesor:</strong> {contract.adviser.status || "--"}</Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

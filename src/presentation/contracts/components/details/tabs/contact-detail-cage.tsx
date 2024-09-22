import React from 'react';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status';
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Box,
    Alert,
    Stack,
} from '@mui/material';
import { statusColor } from '../../table/status-color';
import Label from 'src/components/label';
import { useDetailInfoContext } from '../../../context/contract-detail-context';

export const ContractDetailCage: React.FC = () => {
    const { contract } = useDetailInfoContext();

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
                            color={statusColor(detail?.cage?.status)}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                p: 2,
                                mb: 1,
                                fontSize: '0.875rem',
                                width: "100%"
                            }}
                        >
                            NIVEL DE PROGRESO DEL CLIENTE {CONTRACT_STATUS.find(_ => _.value === detail.cage?.status)?.label}
                        </Label>

                        {detail.pet?.cageRecommendation?.modelCage ? (
                            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center" mt={3}>
                                <Stack width="100%">
                                    <Typography variant="body1">
                                        <strong>Recomendada:</strong>
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1">
                                        <strong>Tipo:</strong> {capitalize(detail.pet?.cageRecommendation?.typeCage) || "No especificado"}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1">
                                        <strong>Modelo:</strong> {capitalize(detail.pet?.cageRecommendation?.modelCage) || "No especificado"}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1">
                                        <strong>Dimensión:</strong> {capitalize(detail.pet?.cageRecommendation?.dimensionsCage) || "No especificado"}
                                    </Typography>
                                </Stack>
                                <Stack width="100%">
                                    <Typography variant="body1">
                                        <strong>Selección de Jaula:</strong>
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1">
                                        <strong>Tipo:</strong> {capitalize(detail.cage.chosen.typeCage) || "No seleccionado"}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1">
                                        <strong>Modelo:</strong> {capitalize(detail.cage.chosen.modelCage) || "No seleccionado"}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                    <Typography variant="body1">
                                        <strong>Dimensión:</strong> {capitalize(detail.cage.chosen.dimensionsCage) || "No especificado"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        ) : (
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={{ xs: 3, md: 10 }} mb={5}>
                                <Alert severity="error" sx={{ width: "100%", mb: 2, bgcolor: '#ffcccb', color: '#d32f2f' }}>
                                    <Typography fontWeight="bold">¡Atención!</Typography>
                                    <Typography>
                                        La recomendación de la jaula por parte de Pet Travel aún no se ha realizado. Se requieren las medidas de la mascota antes de proceder.
                                    </Typography>
                                </Alert>
                                <Alert severity="info" sx={{ width: "100%", bgcolor: '#bbdefb', color: '#1976d2' }}>
                                    <Typography fontWeight="bold">Información Importante:</Typography>
                                    <Typography>
                                        Por favor, póngase en contacto con Pet Travel para coordinar el proceso de medición de su mascota y así poder proceder con la recomendación adecuada de la jaula.
                                    </Typography>
                                </Alert>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            ))}
        </>
    );
};

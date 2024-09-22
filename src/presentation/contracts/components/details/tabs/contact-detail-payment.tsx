import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Divider,
    Box,
    Alert,
} from '@mui/material';
import { useDetailInfoContext } from '../../../context/contract-detail-context';
import { fDateTimeLong } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import Label from 'src/components/label';
import { statusColor } from '../../table/status-color';

export const ContractDetailPayment: React.FC = () => {
    const { contract } = useDetailInfoContext();
    const { payInInstallments = [] } = contract;

    const paymentStatus = payInInstallments.reduce((currentValue, installment) => {
        return installment.isPay && currentValue
    }, true)

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {payInInstallments.length > 0 &&
                        <Label
                            color={statusColor(paymentStatus ? "completed" : "pending")}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                p: 2,
                                mb: 1,
                                fontSize: '0.875rem',
                                width: "100%"
                            }}
                        >
                            CUOTAS POR PAGAR {paymentStatus ? "COMPLETADO" : "PENDIENTE"}
                        </Label>
                    }
                    {payInInstallments.length === 0 ? (
                        <Typography variant="body1">No hay cuotas de pago registradas.</Typography>
                    ) : (
                        payInInstallments.map((installment, index) => (
                            <Card key={index} sx={{ my: 2 }}>
                                <CardContent>
                                    <Box display="flex" gap={1} alignItems="center">
                                        <Alert
                                            severity={installment.isPay ? 'success' : 'error'}
                                            variant="outlined"
                                            sx={{
                                                p: "0 2rem"
                                            }}
                                        >
                                            {installment.isPay ? 'Pago realizado' : 'Pago pendiente'} - Cuota {index + 1} de {payInInstallments.length}
                                        </Alert>
                                    </Box>
                                    <Typography variant="body1">
                                        <strong>Precio:</strong> {installment.price} USD
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Porcentaje:</strong> {installment.percentage.toFixed(2)}%
                                    </Typography>
                                    <Typography variant="body1">
                                        <strong>Fecha de vencimiento:</strong> {fDateTimeLong(installment.date)}
                                    </Typography>

                                    <Divider sx={{ my: 2 }} />

                                    {installment.customerPayments?.length ? (
                                        <>
                                            <Typography variant="subtitle1">Pagos realizados:</Typography>
                                            <Grid container spacing={2}>
                                                {installment.customerPayments.map((payment, paymentIndex) => (
                                                    <Grid item xs={12} sm={6} md={4} key={paymentIndex}>
                                                        <Card>
                                                            <CardContent>
                                                                <Typography variant="body2">
                                                                    <strong>Monto:</strong> {payment.price} USD
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    <strong>Método:</strong> {payment.method}
                                                                </Typography>
                                                                <Typography variant="body2">
                                                                    <strong>Fecha:</strong> {fDateTimeLong(payment.date)}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </>
                                    ) : (
                                        <Typography variant="body2">No hay pagos registrados para esta cuota.</Typography>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </Grid>
            </Grid >
        </>
    );
};

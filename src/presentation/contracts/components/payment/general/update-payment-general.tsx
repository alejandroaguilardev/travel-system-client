import { DatePicker } from '@mui/x-date-pickers';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useUpdatePaymentGeneral } from './use-update-payment-general';
import Label from '../../../../../components/label';
import { fDate, fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { CustomerPayment, customerPaymentSaldo } from '../../../../../modules/contracts/domain/customer-payments';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { useSelectedValue } from '../../../../../hooks/use-selected-value';
import { fCurrency } from '../../../../../modules/shared/domain/helpers/format-number';
import { useBoolean } from '../../../../../hooks';
import { useState } from 'react';

const today = fDayjs(new Date());

interface ConfirmPayTotal {
    isPay: boolean;
    index: number;
    price: number;
    customerPayments: CustomerPayment[];
}

export const UpdatePaymentGeneral = () => {
    const { selected, handleSelected } = useSelectedValue<{ payInInstallment: PayInInstallment, index: number }>();
    const { payInInstallments, handleIsPay, dateCustomer, handlePayParcial, priceCustomer, setDate, setPriceCustomer } = useUpdatePaymentGeneral();

    const { value, onTrue, onFalse } = useBoolean(false);
    const [isPayValues, setIsPayValues] = useState<ConfirmPayTotal | null>(null);

    const handleIsPayValues = ({ isPay, index, price, customerPayments }: ConfirmPayTotal) => {
        setIsPayValues({ isPay, index, price, customerPayments });
        onTrue();
    }
    const handleClose = () => {
        setIsPayValues(null);
        onFalse();
    }
    return (
        <Stack spacing={1} marginBottom={1}>
            <Table>
                <TableHead>
                    <TableCell>Estado</TableCell>
                    <TableCell>Fecha estimada</TableCell>
                    <TableCell>Costo</TableCell>
                    <TableCell>Saldo por pagar</TableCell>
                    <TableCell>Acciones</TableCell>
                </TableHead>
                <TableBody>
                    {payInInstallments?.map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Label
                                    color={_.isPay ? "success" : "error"}
                                    sx={{ px: 4, py: 3, width: "100%" }}
                                >
                                    {_.isPay ? "Pagado" : "No Pagado"}
                                </Label>
                            </TableCell>
                            <TableCell>
                                <Label sx={{ width: "100%" }} color={today.isAfter(_.date) ? "error" : "default"} >{fDate(_.date, "DD/MM/YYYY")}</Label>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={_.price.toFixed(2)}
                                    label="Precio"
                                    sx={{
                                        width: "100%"
                                    }}
                                /></TableCell>
                            <TableCell>
                                <TextField
                                    value={customerPaymentSaldo(_?.price, _?.customerPayments).toFixed(2)}
                                    label="Saldo"
                                    sx={{
                                        width: "100%"
                                    }}
                                />
                            </TableCell>
                            <TableCell sx={{ display: "flex" }}>
                                <Button variant='contained' color={_.isPay ? "error" : "primary"} sx={{ mr: 1 }} onClick={() => handleIsPayValues({ index: i, isPay: _.isPay, price: _.price, customerPayments: _?.customerPayments ?? [] })} fullWidth>
                                    {_.isPay ? "Cancelar Pago" : "Pago total"}
                                </Button>
                                <Button variant='outlined' color='success' disabled={_.isPay} fullWidth onClick={() => {
                                    handleSelected({ payInInstallment: _, index: i });
                                    setDate(new Date());
                                    setPriceCustomer(customerPaymentSaldo(_?.price, _?.customerPayments));
                                }}>
                                    Pago Parcial
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selected?.payInInstallment &&
                <Dialog open={!!selected?.payInInstallment} onClose={() => handleSelected(null)} maxWidth="xl" fullWidth>
                    <DialogTitle mx={2} my={0} textAlign="center">Cuota de Pago</DialogTitle>
                    <DialogContent sx={{ p: 5 }}>
                        {selected?.payInInstallment.price > 0 &&

                            <Box display="flex" gap={4} mb={2} alignItems="center">
                                <Typography variant='h6'>
                                    Fecha:
                                    <Label sx={{ ml: 1 }} color={today.isAfter(selected?.payInInstallment?.date) ? "error" : "default"} >
                                        {fDate(selected?.payInInstallment?.date, "DD/MM/YYYY")}
                                    </Label>
                                </Typography>
                                <Typography variant='body1'>
                                    Costo de la Cuota: {fCurrency(selected?.payInInstallment.price)}
                                </Typography>
                            </Box>
                        }
                        <Stack spacing={1} mb={2} direction={{ xs: 'column', sm: 'row' }} flexGrow={1} sx={{ minWidth: 0 }}>
                            <DatePicker
                                label="Fecha de pago"
                                value={fDayjs(dateCustomer)}
                                onChange={(value: any) => setDate(value.toDate())}
                                sx={{
                                    width: "100%"
                                }}
                                format='DD/MM/YYYY'
                            />

                            <TextField
                                label="Monto"
                                type='number'
                                value={priceCustomer}
                                onChange={e => setPriceCustomer(Number(e.target.value))}
                                fullWidth
                                inputProps={{ min: 0, max: 1000 }}
                            />
                            <Button variant='contained' fullWidth onClick={() => {
                                const resolve = handlePayParcial(selected.index, selected.payInInstallment);

                                if (resolve) {
                                    handleSelected(null)
                                }
                            }}>
                                Pagar Monto
                            </Button>
                        </Stack>

                        <Table>
                            <TableHead>
                                <TableCell>Fecha estimada</TableCell>
                                <TableCell>Pago</TableCell>
                            </TableHead>
                            <TableBody>
                                {selected?.payInInstallment?.customerPayments?.map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <DatePicker
                                                label="Fecha de pago"
                                                value={fDayjs(_.date)}
                                                sx={{
                                                    width: "100%",
                                                }}
                                                format='DD/MM/YYYY'
                                                disabled
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={_.price.toFixed(2)}
                                                label="Precio"
                                                sx={{
                                                    width: "100%"
                                                }}
                                                disabled
                                            /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </DialogContent>
                </Dialog>
            }

            <Dialog open={value} onClose={handleClose}>
                <DialogTitle>Confirmar Acción</DialogTitle>
                <DialogContent>
                    ¿Esta seguro de realizar la siguiente acción de  {isPayValues?.isPay ? "Cancelar Pago esto hará que se borrén los pagos parciales realizados anteriormente" : "realizar un Pago total"}?
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => onFalse()}>Cancelar</Button>
                    <Button variant="contained" onClick={() => handleIsPay(isPayValues?.index ?? 0, customerPaymentSaldo(isPayValues?.price, isPayValues?.customerPayments))}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </Stack >
    )
}


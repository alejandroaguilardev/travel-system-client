import { DatePicker } from '@mui/x-date-pickers';
import Label from '../../../../../../components/label';
import { fDateTime, fDayjs } from '../../../../../../modules/shared/infrastructure/helpers/format-time';
import { PayInInstallment } from '../../../../../../modules/contracts/domain/payment-summary';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { fCurrency } from '../../../../../../modules/shared/domain/helpers/format-number';
import { METHODS_PAYMENTS } from '../../../../../../modules/contracts/domain/customer-payments';
import { MethodPaymentInput } from './method-payment-input';

const today = fDayjs(new Date());

interface Props {
    index: number;
    isOpen: boolean;
    payInInstallment: PayInInstallment;
    dateCustomer: Date;
    priceCustomer: number;
    methodPayment: string;
    isDisabled: boolean;
    handleMethodPayment: (method: string) => void;
    handlePriceCustomer: (price: number) => void;
    handleChangeDate: (date: Date) => void;
    handlePayParcial: (index: number, payInInstallment: PayInInstallment) => boolean;
    handleClose: () => void;
}

export const DialogUpdatePaymentGeneralParcial = ({
    index,
    isOpen,
    payInInstallment,
    dateCustomer,
    priceCustomer,
    methodPayment,
    isDisabled,
    handleMethodPayment,
    handleClose,
    handlePriceCustomer,
    handleChangeDate,
    handlePayParcial
}: Props) => {


    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="xl" fullWidth>
            <DialogTitle mx={2} textAlign="center">Listado de Pagos de la Cuota de Pago</DialogTitle>
            <DialogContent sx={{ p: 5 }}>
                <Divider sx={{ mb: 2 }} />
                {payInInstallment.price > 0 &&

                    <Box display="flex" gap={4} mb={2} alignItems="center" justifyContent="space-around">
                        <Typography variant='h6'>
                            Fecha:
                            <Label sx={{ ml: 1 }} color={today.isAfter(payInInstallment?.date) ? "error" : "default"} >
                                {fDateTime(payInInstallment?.date, "DD/MM/YYYY")}
                            </Label>
                        </Typography>
                        <Typography variant='h6'>
                            Costo de la Cuota
                            <Label sx={{ ml: 1 }} color={"error"} >
                                {fCurrency(payInInstallment.price)}
                            </Label>

                        </Typography>
                    </Box>
                }
                <Divider sx={{ my: 2 }} />
                {isDisabled &&
                    <Stack spacing={1} mb={2} direction={{ xs: 'column', sm: 'row' }} flexGrow={1} sx={{ minWidth: 0 }}>
                        <DatePicker
                            label="Fecha de pago"
                            value={fDayjs(dateCustomer)}
                            onChange={(value: any) => handleChangeDate(value.toDate())}
                            sx={{
                                width: "100%"
                            }}
                            format='DD/MM/YYYY'
                        />

                        <MethodPaymentInput methodPayment={methodPayment} handleMethodPayment={handleMethodPayment} />
                        <TextField
                            label="Monto"
                            type='number'
                            value={priceCustomer > 0 ? priceCustomer : ""}
                            onChange={e => handlePriceCustomer(Number(e.target.value))}
                            fullWidth
                            inputProps={{ min: 0, max: 1000 }}
                        />
                        <Button variant='contained' fullWidth onClick={() => {
                            const resolve = handlePayParcial(index, payInInstallment);

                            if (resolve) {
                                handleClose();
                            }
                        }}>
                            Pagar Monto
                        </Button>
                    </Stack>
                }

                <Table>
                    <TableHead>
                        <TableCell>Fecha estimada</TableCell>
                        <TableCell>Método de pago</TableCell>
                        <TableCell>Pago</TableCell>
                    </TableHead>
                    <TableBody>
                        {payInInstallment?.customerPayments?.map((_, i) => (
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
                                        value={_.method}
                                        label="Método de pago"
                                        sx={{
                                            width: "100%"
                                        }}
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
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </DialogContent>
        </Dialog>
    )
}


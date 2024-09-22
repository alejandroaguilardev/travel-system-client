import { Stack, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Label from '../../../../../components/label';
import { fDate, fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { customerPaymentSaldo, validateTotalOrCancelPay } from '../../../../../modules/contracts/domain/customer-payments';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { HandlePayOrCancelButton } from './types';


interface Props {
    payInInstallments: PayInInstallment[];
    onOpenPayOrCancelButton: (data: HandlePayOrCancelButton) => void;
    handleSelected: (data: { payInInstallment: PayInInstallment, index: number }) => void;
}

const today = fDayjs(new Date());


export const TableUpdatePaymentGeneral = ({ payInInstallments, onOpenPayOrCancelButton, handleSelected }: Props) => {

    return (
        <Stack spacing={1} marginBottom={1}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Estado</TableCell>
                        <TableCell>Fecha estimada</TableCell>
                        <TableCell>Costo</TableCell>
                        <TableCell>Saldo por pagar</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payInInstallments?.map((payInInstallment, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Label
                                    color={payInInstallment.isPay ? "success" : "error"}
                                    sx={{ px: 4, py: 3, width: "100%" }}
                                >
                                    {payInInstallment.isPay ? "Pagado" : "No Pagado"}
                                </Label>
                            </TableCell>
                            <TableCell>
                                <Label sx={{ width: "100%" }} color={today.isAfter(payInInstallment.date) ? "error" : "default"} >{fDate(payInInstallment.date, "DD/MM/YYYY")}</Label>
                            </TableCell>
                            <TableCell >
                                <TextField
                                    value={payInInstallment.price.toFixed(2)}
                                    label="Precio"
                                    sx={{
                                        width: "100%",
                                    }}
                                    disabled
                                /></TableCell>
                            <TableCell >
                                <TextField
                                    value={customerPaymentSaldo(payInInstallment?.price, payInInstallment?.customerPayments).toFixed(2)}
                                    label="Saldo"
                                    sx={{
                                        width: "100%",

                                    }}
                                    disabled
                                />
                            </TableCell>
                            <TableCell sx={{ display: "flex" }}>
                                <Button variant='contained'
                                    color={validateTotalOrCancelPay(payInInstallment?.customerPayments) ? "error" : "primary"}
                                    sx={{ mr: 1 }}
                                    onClick={() => onOpenPayOrCancelButton({
                                        index,
                                        price: payInInstallment.price,
                                        isPay: payInInstallment.isPay,
                                        customerPayments: payInInstallment?.customerPayments ?? []
                                    })}
                                    fullWidth>
                                    {validateTotalOrCancelPay(payInInstallment?.customerPayments)
                                        ? "Cancelar Pago"
                                        : "Pago total"}
                                </Button>
                                {

                                }
                                <Button variant='outlined' color={payInInstallment.isPay ? 'info' : 'success'} fullWidth
                                    onClick={() => handleSelected({ payInInstallment, index })}>
                                    {payInInstallment.isPay ? "Listar Pago" : "Pago Parcial"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </Stack >
    )
}


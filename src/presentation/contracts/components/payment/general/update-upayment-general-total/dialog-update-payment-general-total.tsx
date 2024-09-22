import { customerPaymentSaldo, validateTotalOrCancelPay } from '../../../../../../modules/contracts/domain/customer-payments';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useContextDialog } from '../../../../../../components/dialog-context/dialog-context-generic';
import { ConfirmPayTotal } from '../types';
import { MethodPaymentInput } from '../update-upayment-general-parcial/method-payment-input';

interface Props {
    payValues: ConfirmPayTotal | null;
    methodPayment: string;
    handleMethodPayment: (method: string) => void;
    handlePayTotalOrCancel: (index: number, saldo: number) => void;
}

export const DialogUpdatePaymentGeneralTotal = ({ payValues, methodPayment, handleMethodPayment, handlePayTotalOrCancel }: Props) => {
    const { isOpen, closeDialog } = useContextDialog();

    const isCancelPay = validateTotalOrCancelPay(payValues?.customerPayments);

    const handleCloseAction = () => {
        closeDialog();
    }

    const handleClickAction = () => {
        handlePayTotalOrCancel(
            payValues?.index ?? 0,
            customerPaymentSaldo(payValues?.price ?? 0, payValues?.customerPayments)
        );
        closeDialog();
    }

    return (
        <Dialog open={isOpen} onClose={handleCloseAction}>
            <DialogTitle>Confirmar Acción de {isCancelPay ? "cancelar pago" : "Pago total de cuota"}</DialogTitle>
            <DialogContent>
                ¿Esta seguro de realizar la siguiente acción de  {isCancelPay ? "Cancelar Pago esto hará que se borrén los pagos parciales realizados anteriormente" : "realizar un Pago total"}?
                {!isCancelPay &&
                    <Box mt={2}>
                        <MethodPaymentInput methodPayment={methodPayment} handleMethodPayment={handleMethodPayment} />
                    </Box>

                }
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCloseAction}>Cancelar</Button>
                <Button variant="contained" onClick={handleClickAction}> Aceptar</Button>
            </DialogActions>
        </Dialog >
    )
}


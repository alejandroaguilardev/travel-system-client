import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { METHODS_PAYMENTS } from '../../../../../../modules/contracts/domain/customer-payments';

type Props = {
    methodPayment: string;
    handleMethodPayment: (method: string) => void;
}

export const MethodPaymentInput = ({ handleMethodPayment, methodPayment }: Props) => {
    return (
        <FormControl fullWidth>
            <InputLabel >Método de Pago</InputLabel>
            <Select
                value={methodPayment}
                onChange={(e) => handleMethodPayment(e.target.value)}
                fullWidth
            >
                {METHODS_PAYMENTS.map((method) => (
                    <MenuItem key={method} value={method}>
                        {method}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

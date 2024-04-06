import { FormControlLabel, InputAdornment, Paper, Stack, Switch, TextField, Typography } from '@mui/material';
import { RHFTextField } from '../../../../../components/hook-form';
import { useContractFormPrices } from './use-contract-form-prices';
import { Counter } from '../../../../../components/counter/counter';
import { DatePicker } from '@mui/x-date-pickers';
import { IconWrapper } from '../../../../../components/icon-wrapper';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';

export const ContractFormPrices = () => {
    const { priceTotal, counter, payInInstallments, isPayInstallments, handleIsPayInstallments, handleCounter, handleCuotaChange, handlePercentageChange } = useContractFormPrices();

    return (
        <Paper
            sx={{
                p: 3,
                my: 3,
            }}>
            <Stack spacing={1} marginBottom={2}>
                <Typography variant='h5' mb={2}>Resumen de Pago</Typography>
                <Stack spacing={1} marginBottom={1}>
                    <RHFTextField
                        name="price"
                        label="Precio del contrato en dólares (*)"
                        type='number'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconWrapper icon='accountPaymentOutline' />
                                </InputAdornment>
                            )
                        }}
                    />
                </Stack>
                {
                    priceTotal ?
                        <>
                            <FormControlLabel
                                control={<Switch onClick={() => handleIsPayInstallments()} />}
                                label="Pagar en cuotas"
                            />
                            {
                                isPayInstallments &&
                                <>
                                    <Stack spacing={1} marginBottom={1} display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" >
                                        <Typography variant='subtitle2' >N° DE CUOTAS (la primera cuota se adicionará como pagada)</Typography>
                                        <Counter
                                            counter={counter}
                                            callback={handleCounter}
                                        />
                                    </Stack>
                                    <Stack spacing={1} marginBottom={1}>
                                        {
                                            payInInstallments?.map((pay, index, array) => (
                                                <Stack key={index + "counter"} display="flex" flexDirection={{ xs: "column", md: "row" }}>
                                                    <DatePicker
                                                        label="Fecha de pago (*)"
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        format='DD/MM/YYYY'
                                                        value={fDayjs(pay.date)}
                                                    />
                                                    <TextField
                                                        label="Cuota Porcentaje (*)"
                                                        type='number'
                                                        value={pay?.percentage ?? 0}
                                                        onChange={(e) => {
                                                            handlePercentageChange(parseFloat(e.target.value) ?? 0, index, array)
                                                        }}
                                                        fullWidth
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconWrapper icon='percentage' />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />
                                                    <TextField
                                                        label="Cuota (*)"
                                                        type='number'
                                                        value={pay?.price ?? 0}
                                                        onChange={(e) => handleCuotaChange(parseFloat(e.target.value) ?? 0, index, array)}
                                                        fullWidth
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <IconWrapper icon='payMoney' />
                                                                </InputAdornment>
                                                            )
                                                        }}
                                                    />

                                                </Stack>
                                            ))}
                                    </Stack>
                                </>
                            }
                        </>
                        : ""
                }
            </Stack>
        </Paper>
    )
}

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Contract } from "../../../../modules/contracts/domain/contract";
import FormProvider from '../../../../components/hook-form/form-provider';
import { ContractCancelData, useCancel } from "../../hooks/use-cancel";
import RHFTextField from '../../../../components/hook-form/rhf-text-field';
import { LoadingButton } from '@mui/lab';

const schema = Yup.object().shape({
    reasonForCancellation: Yup.string().required("Indique el motivo de cancelación")
})


type Props = {
    contract: Contract;
    open: boolean;
    setLoading: (isLoading: boolean) => void;
    callback: () => void;
    onClose: () => void;
    onCancel: () => void;
}

export const CancelContract = ({ open, contract, setLoading, callback, onCancel, onClose, }: Props) => {
    const { onSubmit } = useCancel({ contract, callback, setLoading });
    const methods = useForm({
        resolver: yupResolver<ContractCancelData>(schema),
        defaultValues: { reasonForCancellation: "" }
    });


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                <DialogTitle mx={2} my={0} textAlign="center">Se cancelará el contrato y se dará por concluido</DialogTitle>
                <DialogContent >
                    <DialogContentText sx={{ mx: 2, mb: 2 }}>
                        Se notifica a todas las partes involucradas que el contrato ha sido cancelado y se da por concluido. Todas las obligaciones y responsabilidades derivadas del mismo han sido cumplidas.
                    </DialogContentText>
                    <RHFTextField
                        name="reasonForCancellation"
                        label="Motivo de cancelación"
                        rows={3}
                        multiline
                    />
                </DialogContent>
                <DialogActions sx={{ m: 1, display: "flex", justifyContent: "center" }}>
                    <Button type="button" variant='outlined' color="error"
                        onClick={() => onCancel ? onCancel() : onClose()}>Cancelar</Button>
                    <LoadingButton type="submit" variant='contained' color="primary" autoFocus>Cancelar contrato</LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}

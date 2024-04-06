import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Contract } from "src/modules/contracts/domain/contract";
import { useCancel } from "../../hooks/use-cancel";


type Props = {
    contract: Contract;
    open: boolean;
    setLoading: (isLoading: boolean) => void;
    callback: () => void;
    onClose: () => void;
    onCancel: () => void;
}

export const CancelContract = ({ open, contract, setLoading, callback, onCancel, onClose, }: Props) => {
    const { handleCancelClick } = useCancel({ contract, callback, setLoading });


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle mx={2} my={0} textAlign="center">Se cancelará el contrato y se dará por concluido</DialogTitle>
            <DialogContent >
                <DialogContentText sx={{ mx: 2, my: 0 }}>
                    Se notifica a todas las partes involucradas que el contrato ha sido cancelado y se da por concluido. Todas las obligaciones y responsabilidades derivadas del mismo han sido cumplidas.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ m: 1, display: "flex", justifyContent: "center" }}>
                <Button variant='outlined' color="error"
                    onClick={() => onCancel ? onCancel() : onClose()}>Cancelar</Button>
                <Button variant='contained' color="primary" onClick={handleCancelClick} autoFocus>Cancelar contrato</Button>
            </DialogActions>
        </Dialog>
    )
}

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Contract } from "src/modules/contracts/domain/contract";
import { useFinish } from "../../hooks/use-finish";


type Props = {
    contract: Contract;
    open: boolean;
    setLoading: (isLoading: boolean) => void;
    callback: () => void;
    onClose: () => void;
    onCancel: () => void;
}

export const FinishContract = ({ open, contract, callback, onCancel, onClose, setLoading, }: Props) => {
    const { handleFinishClick } = useFinish({ contract, callback, setLoading });


    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle mx={2} my={0} textAlign="center">Se finalizará el contrato y se dará por concluido</DialogTitle>
            <DialogContent >
                <DialogContentText sx={{ mx: 2, my: 0 }}>
                    Se informa a las partes involucradas que la relación contractual se ha extinguido y que todas las obligaciones y responsabilidades derivadas de la misma han sido cumplidas.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ m: 1, display: "flex", justifyContent: "center" }}>
                <Button variant='outlined' color="error"
                    onClick={() => onCancel ? onCancel() : onClose()}>Cancelar</Button>
                <Button variant='contained' color="primary" onClick={handleFinishClick} autoFocus>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}

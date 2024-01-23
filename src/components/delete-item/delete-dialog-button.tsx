import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from '@mui/material';

interface DialogDeleteProps {
    title?: string;
    description?: string;
    open: boolean,
    onClose: () => void;
    onAccept: () => void;
    onCancel?: () => void;
    successText?: string;
}

export const DialogDelete = ({ open,
    onClose,
    onAccept,
    onCancel,
    title = '¿Seguro que deseas continuar?',
    successText = "Eliminar",
    description = 'Te recordamos que esta acción es irreversible, lo que significa que una vez que confirmes la eliminación, no habrá vuelta atrás y el elemento se eliminará de forma permanente.',
}: DialogDeleteProps) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle mx={2} my={0} textAlign="center">{title}</DialogTitle>
        <DialogContent >
            <DialogContentText sx={{ mx: 2, my: 0 }}>
                {description}
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ m: 1, display: "flex", justifyContent: "center" }}>
            <Button variant='outlined' color="error"
                onClick={() => onCancel ? onCancel() : onClose()}>Cancelar</Button>
            <Button variant='contained' color="error" onClick={onAccept} autoFocus>{successText}</Button>
        </DialogActions>
    </Dialog>
)


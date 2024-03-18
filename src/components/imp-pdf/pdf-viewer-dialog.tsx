import { FC } from 'react';
import { Button, Dialog, DialogContent } from '@mui/material';
import { PdfViewer, PdfViewerProps } from './pdf-viewer';

interface Props extends PdfViewerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PdfViewerDialog: FC<Props> = ({ children, isOpen, onClose, ...rest }) => (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ py: 4, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <PdfViewer height={500} >
                {children}
            </PdfViewer>
            <Button sx={{ mt: 1 }} variant='contained' onClick={onClose}>Cerrar</Button>
        </DialogContent>
    </Dialog>
)

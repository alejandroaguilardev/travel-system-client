import { FC } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogProps, IconButton, Divider } from '@mui/material';

interface Props extends DialogProps {
    title: string;
    open: boolean;
    onClose: () => void;
}

export const DialogContract: FC<Props> = ({ open, onClose, title, children, ...rest }) => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        {...rest}
    >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
            {title}
            <IconButton size="small" onClick={onClose}>
                X
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Divider sx={{ mb: 1 }} />
            {children}
        </DialogContent>
    </Dialog>
);

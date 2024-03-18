import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, useTheme, Box, Typography, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { IconWrapper } from '../icon-wrapper';

interface MaterialAlertProps {
    title: string;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
    open: boolean;
    onClose: () => void;
    callback?: VoidFunction
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertModal: React.FC<MaterialAlertProps> = ({
    title,
    message,
    severity,
    open,
    onClose,
    callback
}) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
            TransitionComponent={Transition}

        >

            <DialogContent sx={{ pt: 5, px: 5 }}>
                <Box display="flex" alignItems="center" flexDirection="column" flexGrow={2} sx={{
                    marginBottom: theme.spacing(2),
                }}>
                    <IconWrapper icon='checkCircleFill' width={50} color="green" />
                    <Typography variant='h5'>{title}</Typography>
                </Box>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{
                px: 5,
                pb: 4,
                display: "flex",
                justifyContent: "center"
            }}>
                <Button onClick={() => {
                    if (callback) {
                        callback();
                        return;
                    }
                    onClose();
                }}
                    color="primary"
                    variant='contained'
                    fullWidth
                >
                    CONTINUAR
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default AlertModal;
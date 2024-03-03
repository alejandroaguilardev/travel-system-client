'use client';

import { ReactNode, useRef } from 'react';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import { alpha, useTheme } from '@mui/material/styles';
import { Box, GlobalStyles, IconButton } from '@mui/material';
import { ColorSchema } from '../../theme/palette';
import { IconKeys, IconWrapper } from '../icon-wrapper';

// ----------------------------------------------------------------------

function SnackbarStyles() {
    const theme = useTheme();

    return (
        <GlobalStyles
            styles={{
                '#__next': {
                    '& .SnackbarContent-root': {
                        width: '100%',
                        padding: theme.spacing(1),
                        margin: theme.spacing(0.25, 0),
                        boxShadow: theme.customShadows.z8,
                        borderRadius: theme.shape.borderRadius,
                        '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
                        {
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.paper,
                        },
                        [theme.breakpoints.up('md')]: {
                            minWidth: 240,
                        },
                    },
                    '& .SnackbarItem-message': {
                        padding: '0 !important',
                        fontWeight: theme.typography.fontWeightMedium,
                    },
                    '& .SnackbarItem-action': {
                        marginRight: 0,
                        color: theme.palette.action.active,
                        '& svg': { width: 20, height: 20 },
                    },
                },
            }}
        />
    );
}

// ----------------------------------------------------------------------

type Props = {
    children: ReactNode;
};

export default function NotistackProvider({ children }: Props) {
    const notistackRef = useRef<any>(null);

    const onClose = (key: SnackbarKey) => () => {
        notistackRef.current.closeSnackbar(key);
    };

    return (
        <>
            <SnackbarStyles />

            <SnackbarProvider
                ref={notistackRef}
                dense
                maxSnack={5}
                autoHideDuration={3000}
                variant="success" // Set default variant
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                iconVariant={{
                    info: <SnackbarIcon icon='infoFill' color="info" />,
                    success: <SnackbarIcon icon='checkCircleFill' color="success" />,
                    warning: <SnackbarIcon icon='alertTriangleFill' color="warning" />,
                    error: <SnackbarIcon icon='errorAlt' color="error" />,
                }}
                action={(key) => (
                    <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
                        <IconWrapper icon='closeFill' />
                    </IconButton>
                )}
            >
                {children}
            </SnackbarProvider>
        </>
    );
}

// ----------------------------------------------------------------------

type SnackbarIconProps = {
    icon: IconKeys;
    color: ColorSchema;
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
    return (
        <Box
            component="span"
            sx={{
                mr: 1.5,
                width: 20,
                height: 20,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                justifyContent: 'center',
                color: `${color}.main`,
                bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
            }}
        >
            <IconWrapper icon={icon} width={24} height={24} />
        </Box>
    );
}

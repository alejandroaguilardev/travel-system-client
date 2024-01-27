import { ReactNode } from 'react';
import Paper, { PaperProps } from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type Props = Omit<PaperProps, 'title'> & {
    title: ReactNode;
};

export function ShadowCard({ sx, title, ...rest }: Props) {
    return (
        <Paper
            {...rest}
            sx={{
                padding: 3,
                margin: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: {
                    xs: 'calc((100%/2) - 24px)',
                    sm: 'calc((100%/4) - 24px)',
                    md: 'calc((100%/6) - 24px)',
                },
                ...sx,
            }}
        >
            <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                {title}
            </Typography>
        </Paper>
    );
}

import { Box, Divider, Stack, Typography } from '@mui/material'
import Logo from '../../../components/logo/logo';

type Props = {
    title?: string
}

export const HeadLogin = ({ title = "Iniciar sesión" }: Props) => {
    return (
        <Stack spacing={2} sx={{ mb: 3 }}>
            <Box display="flex" justifyContent="center" width="100%">
                <Logo width={150} height={60} />
            </Box>

            <Typography variant="h4" textAlign="center">{title}</Typography>
            <Divider />
        </Stack >
    )
}

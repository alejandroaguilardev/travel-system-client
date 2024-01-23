import { Box, Button, Container, Link, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { RouterLink } from '../../app/routes/components';
import { paths } from '../../app/routes/paths';

export default function DashboardView() {

    return (
        <Container  >

            <Box
                sx={{
                    padding: 10,
                    width: 1,
                    height: 320,
                    borderRadius: 2,
                    bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                    border: (theme) => `dashed 1px ${theme.palette.divider}`,
                }}
            >
                <Typography variant="h3" gutterBottom>
                    ¡Bienvenido a Pet Travel!
                </Typography>
                <Typography variant="body1" gutterBottom >
                    Nos complace darte la bienvenida a nuestra plataforma. Descubre un mundo de posibilidades y simplifica tu vida con nuestras increíbles características y herramientas innovadoras.
                </Typography>
                <Typography variant="body1" gutterBottom >
                    Explora a fondo y no dudes en contactarnos si necesitas ayuda o tienes alguna pregunta. ¡Estamos aquí para hacer que tu experiencia sea excepcional!
                </Typography>
                <Link component={RouterLink} href={paths.dashboard.contracts.root} underline="none">
                    <Button variant="contained" fullWidth color="primary" >
                        Ver contratos
                    </Button>
                </Link>
            </Box>
        </Container>
    );
}

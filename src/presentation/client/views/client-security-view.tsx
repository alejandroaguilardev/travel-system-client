import { Container, Divider, Typography } from '@mui/material';
import { ClientSecurityForm } from '../components/client-security/client-security';
import { useRouter } from '../../../app/routes/hooks/use-router';
import { paths } from '../../../app/routes/paths';


export default function ClientSecurityView() {
    const router = useRouter()

    const redirectData = () => router.push(paths.client.profile)

    return (
        <Container maxWidth='xl'>
            <Typography variant='h4' textAlign="center" mb={2}>
                Actualiza tu contraseña
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ClientSecurityForm callback={redirectData} />
        </Container>
    );
}


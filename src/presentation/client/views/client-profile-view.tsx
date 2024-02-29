import { Container, Typography } from '@mui/material';
import { ClientProfileForm } from '../components/client-profile/client-profile-form';
import { useAuthContext } from '../../auth/hooks/use-auth-context';

export default function ClientProfileView() {
    const { user } = useAuthContext()

    return (
        <Container maxWidth='xl'>
            <Typography variant='h4' textAlign="center" mb={2}>Actualizar mi perfil </Typography>
            <ClientProfileForm callback={() => false} profile={user?.profile} />
        </Container>
    );
}


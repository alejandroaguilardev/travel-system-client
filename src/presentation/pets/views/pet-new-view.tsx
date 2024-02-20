import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { PetForm } from '../components/form/pet-form';


export default function PetNewView() {
    const router = useRouter();

    const redirectData = () => router.push(paths.dashboard.pets.root);

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                sx={{ display: "inline" }}
                heading="Crear nueva mascota"
                links={[
                    { name: 'Inicio', href: paths.dashboard.root },
                    { name: 'Mascotas', href: paths.dashboard.pets.root },
                    { name: `Crear` },
                ]}
            />
            <PetForm callback={redirectData} />
        </Container>
    );
}


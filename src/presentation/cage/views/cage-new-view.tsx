import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { CageForm } from '../components/form/cage-form';


export default function CageNewView() {
    const router = useRouter();

    const redirectData = () => router.push(paths.dashboard.cages.root);

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                sx={{ display: "inline" }}
                heading="Crear nueva jaula"
                links={[
                    { name: 'Inicio', href: paths.dashboard.root },
                    { name: 'Jaulas', href: paths.dashboard.cages.root },
                    { name: `Crear` },
                ]}
            />
            <CageForm callback={redirectData} />
        </Container>
    );
}


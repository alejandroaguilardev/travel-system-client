import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { PermissionForm } from '../components/form/permission-form';


export default function PermissionNewView() {
    const router = useRouter();

    const redirectData = () => router.push(paths.dashboard.permissions.root);

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                sx={{ display: "inline" }}
                heading="Crear  nuevo permiso"
                links={[
                    { name: 'Inicio', href: paths.dashboard.root },
                    { name: 'Permisos', href: paths.dashboard.permissions.root },
                    { name: `Crear` },
                ]}
            />
            <PermissionForm callback={redirectData} />
        </Container>
    );
}


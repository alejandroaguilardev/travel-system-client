import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { RoleForm } from '../components/form/role-form';


export default function RoleNewView() {
    const router = useRouter();

    const redirectData = () => router.push(paths.dashboard.roles.root);

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                sx={{ display: "inline" }}
                heading="Crear  nuevo rol"
                links={[
                    { name: 'Inicio', href: paths.dashboard.root },
                    { name: 'Roles', href: paths.dashboard.roles.root },
                    { name: `Crear` },
                ]}
            />
            <RoleForm callback={redirectData} />
        </Container>
    );
}


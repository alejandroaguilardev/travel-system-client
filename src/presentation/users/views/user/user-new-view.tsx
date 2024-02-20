import { Container } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { UserForm } from '../../components/form/user-form';
import { ConditionUserProvider } from '../../contexts/condition-user-context';


export default function UserNewView() {
    const router = useRouter();

    const redirectData = () => router.push(paths.dashboard.users.root);

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                sx={{ display: "inline" }}
                heading="Crear  nuevo Usuario"
                links={[
                    { name: 'Inicio', href: paths.dashboard.root },
                    { name: 'Usuarios', href: paths.dashboard.users.root },
                    { name: `Crear` },
                ]}
            />
            <ConditionUserProvider isUser>
                <UserForm callback={redirectData} />
            </ConditionUserProvider>
        </Container>
    );
}


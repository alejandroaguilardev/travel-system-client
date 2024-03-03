import { Container } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { UserForm } from '../../components/form/user-form';
import { ConditionUserProvider } from '../../contexts/condition-user-context';


export default function UserClientNewView() {
    const router = useRouter();
    const redirectData = () => router.push(paths.dashboard.clients.root);

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                sx={{ display: "inline" }}
                heading="Crear  nuevo Cliente"
                links={[
                    { name: 'Inicio', href: paths.dashboard.root },
                    { name: 'Clientes', href: paths.dashboard.clients.root },
                    { name: `Crear` },
                ]}
            />
            <ConditionUserProvider isUser={false}>
                <UserForm callback={redirectData} />
            </ConditionUserProvider>
        </Container>
    );
}


import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import { capitalize } from '../../../modules/shared/domain/helpers';
import { roleToNewRole } from '../../../modules/roles/domain/role';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdRole } from '../hooks/use-search-by-id-role';
import { RoleForm } from '../components/form/role-form';

type Props = {
    id: string;
}

export default function RoleEditView({ id }: Props) {
    const router = useRouter();

    const { role, error, isLoading } = useSearchByIdRole(id);
    const redirectData = () => router.push(paths.dashboard.roles.root);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!role} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Editar: ${capitalize(role?.name)} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Roles', href: paths.dashboard.roles.root },
                        { name: `${capitalize(role?.name)}` },
                    ]}
                />
                <RoleForm
                    callback={redirectData}
                    role={role ? roleToNewRole(role) : undefined}
                />
            </Container>
        </SearchIdNotFound>
    );
}


import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdRole } from '../hooks/use-search-by-id-role';
import RoleDetail from '../components/details/role-detail';

type Props = {
    id: string;
}

export default function RoleIdView({ id }: Props) {
    const { role, error, isLoading } = useSearchByIdRole(id);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!role} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Visualizar: ${role?.name}`}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Roles', href: paths.dashboard.roles.root },
                        { name: `${role?.name}` },
                    ]}
                />
                <RoleDetail role={role!} />
            </Container>
        </SearchIdNotFound>
    );
}


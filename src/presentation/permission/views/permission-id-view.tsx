import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdPermission } from '../hooks/use-search-by-id-permission';
import PermissionDetail from '../components/details/permission-detail';

type Props = {
    id: string;
}

export default function PermissionIdView({ id }: Props) {
    const { permission, error, isLoading } = useSearchByIdPermission(id);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!permission} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Visualizar: ${permission?.name}`}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Permisos', href: paths.dashboard.permissions.root },
                        { name: `${permission?.name}` },
                    ]}
                />
                <PermissionDetail permission={permission!} />
            </Container>
        </SearchIdNotFound>
    );
}


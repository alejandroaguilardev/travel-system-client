import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import { capitalize } from '../../../modules/shared/domain/helpers';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { PermissionForm } from '../components/form/permission-form';
import { useSearchByIdPermission } from '../hooks/use-search-by-id-permission';

type Props = {
    id: string;
}

export default function PermissionEditView({ id }: Props) {
    const router = useRouter();

    const { permission, error, isLoading } = useSearchByIdPermission(id);
    const redirectData = () => router.push(paths.dashboard.permissions.root);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!permission} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Editar: ${capitalize(permission?.name)} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Permisos', href: paths.dashboard.permissions.root },
                        { name: `${capitalize(permission?.name)}` },
                    ]}
                />
                <PermissionForm callback={redirectData} permission={permission} />
            </Container>
        </SearchIdNotFound>
    );
}


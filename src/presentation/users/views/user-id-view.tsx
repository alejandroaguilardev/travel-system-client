import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdUser } from '../hooks/use-search-by-id-user';
import UserDetail from '../components/details/user-detail';

type Props = {
    id: string;
}

export default function UserIdView({ id }: Props) {
    const { user, error, isLoading } = useSearchByIdUser(id);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!user} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Visualizar: ${user?.profile?.name}`}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Usuarios', href: paths.dashboard.users.root },
                        { name: `${user?.profile?.name}` },
                    ]}
                />
                <UserDetail user={user!} />
            </Container>
        </SearchIdNotFound>
    );
}


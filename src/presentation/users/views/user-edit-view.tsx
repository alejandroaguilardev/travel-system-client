import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import { capitalize } from '../../../modules/shared/domain/helpers';
import { userToNewUser } from '../../../modules/users/domain/user';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdUser } from '../hooks/use-search-by-id-user';
import { UserForm } from '../components/form/user-form';

type Props = {
    id: string;
}

export default function UserEditView({ id }: Props) {
    const router = useRouter();

    const { user, error, isLoading } = useSearchByIdUser(id);
    const redirectData = () => router.push(paths.dashboard.users.root);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!user} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Editar: ${capitalize(user?.profile?.name)} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Usuarios', href: paths.dashboard.users.root },
                        { name: `${capitalize(user?.profile?.name)}` },
                    ]}
                />
                <UserForm
                    callback={redirectData}
                    user={user ? userToNewUser(user) : undefined}
                />
            </Container>
        </SearchIdNotFound>
    );
}


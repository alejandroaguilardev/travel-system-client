import { Helmet } from 'react-helmet-async';
import UserClientView from '../../../../presentation/users/views/client/user-client-view';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';


export default function UserClientPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Clientes</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.LIST}>
                <UserClientView />
            </RoutePermissionGuard>
        </>
    );
}
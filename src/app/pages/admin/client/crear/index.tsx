import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import UserClientNewView from '../../../../../presentation/users/views/client/user-client-new-view';


export default function UserClientNewPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Crear Clientes</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CLIENT} permission={AuthPermission.CREATE}>
                <UserClientNewView />
            </RoutePermissionGuard>
        </>
    );
}
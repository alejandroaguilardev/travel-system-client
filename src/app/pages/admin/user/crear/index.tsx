import { Helmet } from 'react-helmet-async';
import UserNewView from '../../../../../presentation/users/views/user/user-new-view';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';


export default function RoleNewPage() {
    const { user } = useAuthContext();
    return (
        <>
            <Helmet>
                <title> Dashboard Crear Usuario</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.USERS} permission={AuthPermission.CREATE}>
                <UserNewView />
            </RoutePermissionGuard>
        </>
    );
}
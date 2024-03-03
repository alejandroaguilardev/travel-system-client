import { Helmet } from 'react-helmet-async';
import RolesView from '../../../../presentation/roles/views/role-view';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';


export default function RolePage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Roles</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.ROLES} permission={AuthPermission.LIST}>
                <RolesView />
            </RoutePermissionGuard>
        </>
    );
}
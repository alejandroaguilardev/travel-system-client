import { Helmet } from 'react-helmet-async';
import RoleNewView from '../../../../../presentation/roles/views/role-new-view';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';


export default function RoleNewPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Crear Rol</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.ROLES} permission={AuthPermission.CREATE}>
                <RoleNewView />
            </RoutePermissionGuard>
        </>
    );
}
import { Helmet } from 'react-helmet-async';
import PermissionView from '../../../../presentation/permission/views/permission-view';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';


export default function PermissionPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Permisos</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.PERMISSIONS} permission={AuthPermission.LIST}>
                <PermissionView />
            </RoutePermissionGuard>
        </>
    );
}
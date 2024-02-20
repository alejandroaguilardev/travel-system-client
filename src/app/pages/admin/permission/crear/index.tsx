import { Helmet } from 'react-helmet-async';
import PermissionNewView from '../../../../../presentation/permission/views/permission-new-view';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';


export default function PermissionNewPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Crear Permisos</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.PERMISSIONS} permission={AuthPermission.CREATE}>
                <PermissionNewView />
            </RoutePermissionGuard>
        </>
    );
}
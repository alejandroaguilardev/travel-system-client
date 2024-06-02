import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import IncidentView from '../../../../presentation/incidents/views/incident-view';


export default function PermissionPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Incidencias</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.INCIDENTS} permission={AuthPermission.LIST}>
                <IncidentView />
            </RoutePermissionGuard>
        </>
    );
}
import { Helmet } from 'react-helmet-async';
import CageView from '../../../../presentation/cage/views/cage-view';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';


export default function CagePage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Jaulas</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CAGES} permission={AuthPermission.LIST}>
                <CageView />
            </RoutePermissionGuard>
        </>
    );
}
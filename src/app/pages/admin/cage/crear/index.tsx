import { Helmet } from 'react-helmet-async';
import CageNewView from '../../../../../presentation/cage/views/cage-new-view';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';


export default function CageNewPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Crear Jaula</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CAGES} permission={AuthPermission.CREATE}>
                <CageNewView />
            </RoutePermissionGuard>
        </>
    );
}
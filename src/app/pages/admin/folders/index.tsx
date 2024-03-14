import { Helmet } from 'react-helmet-async';
import FolderView from '../../../../presentation/folders/views/folder-view';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';


export default function FolderPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Expedientes</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.FOLDERS} permission={AuthPermission.LIST}>
                <FolderView />
            </RoutePermissionGuard>
        </>
    );
}
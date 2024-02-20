import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import PetNewView from '../../../../../presentation/pets/views/pet-new-view';


export default function PetNewPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Crear Mascotas</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.PETS} permission={AuthPermission.CREATE}>
                <PetNewView />
            </RoutePermissionGuard>
        </>
    );
}
import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import PetView from '../../../../presentation/pets/views/pet-view';


export default function PetPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title> Dashboard Mascotas</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.PETS} permission={AuthPermission.LIST}>
                <PetView />
            </RoutePermissionGuard>
        </>
    );
}
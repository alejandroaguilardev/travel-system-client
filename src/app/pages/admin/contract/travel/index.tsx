import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractTravelView from '../../../../../presentation/contracts/views/travel/contract-travel-view';


export default function ContractTravelPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Reservas</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.TRAVEL}>
                <ContractTravelView />
            </RoutePermissionGuard>
        </>
    );
}

import { Helmet } from 'react-helmet-async';
import { useAuthContext } from '../../../../../../presentation/auth/hooks';
import { useParams } from '../../../../../../app/routes/hooks';
import { NotFoundView } from './../../../../../../presentation/error';
import { RoutePermissionGuard } from '../../../../../..//app/routes/guard/route-permission.guard';
import { AuthGroup, AuthPermission } from '../../../../../../modules/auth/domain/auth-permission';
import ContractTravelUpdateView from '../../../../../../presentation/contracts/views/travel/contract-travel-update-view';

export default function ContractTravelIdPage() {
    const { user } = useAuthContext();
    const params = useParams();
    const { id } = params;

    if (!id) {
        return <NotFoundView />;
    }

    return (
        <>
            <Helmet>
                <title>Contrato Reserva</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.TRAVEL}>
                <ContractTravelUpdateView id={id} />
            </RoutePermissionGuard>
        </>
    );
}

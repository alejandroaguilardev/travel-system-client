import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractFinishView from '../../../../../presentation/contracts/views/finish/contract-finish-view';


export default function ContractHistorialPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Contratos Por Finalizar</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACT_FINISH} permission={AuthPermission.LIST}>
                <ContractFinishView />
            </RoutePermissionGuard>
        </>
    );
}
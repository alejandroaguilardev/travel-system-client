import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractHistoryFinishView from '../../../../../presentation/contracts/views/history/contract-history-finish-view';


export default function ContractHistoryFinishPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Contratos Finalizados</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.LIST}>
                <ContractHistoryFinishView />
            </RoutePermissionGuard>
        </>
    );
}
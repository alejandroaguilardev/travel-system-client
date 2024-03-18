import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractHistoryView from '../../../../../presentation/contracts/views/contract-historial-view';


export default function ContractHistorialPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Historial de Contratos</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.LIST}>
                <ContractHistoryView />
            </RoutePermissionGuard>
        </>
    );
}
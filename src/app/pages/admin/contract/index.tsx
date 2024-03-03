import { Helmet } from 'react-helmet-async';
import ContractsView from '../../../../presentation/contracts/views/contract-view';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';


export default function ContractPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Contratos</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.LIST}>
                <ContractsView />
            </RoutePermissionGuard>
        </>
    );
}
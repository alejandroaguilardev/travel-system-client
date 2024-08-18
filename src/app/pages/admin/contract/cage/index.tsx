import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractCageView from '../../../../../presentation/contracts/views/cage/contract-cage-view';


export default function ContractCagePage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Contrato Jaulas</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACT_CAGE} permission={AuthPermission.LIST}>
                <ContractCageView />
            </RoutePermissionGuard>
        </>
    );
}

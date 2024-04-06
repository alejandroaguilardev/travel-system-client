import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractTestRabiesView from '../../../../../presentation/contracts/views/rabies/contract-test-rabies';


export default function HistoryTestRabiesPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Historial de test serológico de rabia</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.DOCUMENTATION}>
                <ContractTestRabiesView />
            </RoutePermissionGuard>
        </>
    );
}

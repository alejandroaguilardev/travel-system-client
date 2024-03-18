import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractAssignNumberView from '../../../../../presentation/contracts/views/contract-assgin-number-view';


export default function ContractHistorialPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Asignar folio y numero de contrato</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.LIST}>
                <ContractAssignNumberView />
            </RoutePermissionGuard>
        </>
    );
}

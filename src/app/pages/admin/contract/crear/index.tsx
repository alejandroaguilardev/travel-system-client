import { Helmet } from 'react-helmet-async';
import ContractNewView from '../../../../../presentation/contracts/views/crud/contract-new-view';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';


export default function RoleNewPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Crear Contrato</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.CREATE}>
                <ContractNewView />
            </RoutePermissionGuard>
        </>
    );
}
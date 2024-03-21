import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractDocumentationView from '../../../../../presentation/contracts/views/documentation/contract-documentation-view';

export default function ContractHistorialPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Contratos Documentación</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.DOCUMENTATION}>
                <ContractDocumentationView />
            </RoutePermissionGuard>
        </>
    );
}
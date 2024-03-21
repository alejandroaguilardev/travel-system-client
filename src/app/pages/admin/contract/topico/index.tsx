import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractTopicoView from '../../../../../presentation/contracts/views/topico/contract-topico-view';

export default function ContractTopicoPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Contrato Topico</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.CREATE}>
                <ContractTopicoView />
            </RoutePermissionGuard>
        </>
    );
}

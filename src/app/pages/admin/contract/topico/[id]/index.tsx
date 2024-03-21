import { Helmet } from 'react-helmet-async';
import { useParams } from '../../../../../../app/routes/hooks';
import { NotFoundView } from '../../../../../../presentation/error';
import { RoutePermissionGuard } from '../../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../../modules/auth/domain/auth-permission';
import ContractTopicoUpdateView from '../../../../../../presentation/contracts/views/topico/contract-topico-update-view';

export default function ContractTopicoPage() {
    const { user } = useAuthContext();

    const params = useParams();
    const { id } = params;

    if (!id) {
        return <NotFoundView />;
    }

    return (
        <>
            <Helmet>
                <title>Contrato Topico</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.TOPICO}>
                <ContractTopicoUpdateView id={id} />
            </RoutePermissionGuard>
        </>
    );
}

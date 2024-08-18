import { Helmet } from 'react-helmet-async';
import { useParams } from '../../../../../routes/hooks';
import { NotFoundView } from '../../../../../../presentation/error';
import { RoutePermissionGuard } from '../../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../../modules/auth/domain/auth-permission';
import ContractTopicoManagementView from '../../../../../../presentation/contracts/views/topico/contract-topico-management-view';


export default function ContractTopicoManagementPage() {
    const { user } = useAuthContext();

    const params = useParams();
    const { id, action } = params;

    if (!id) {
        return <NotFoundView />;
    }

    return (
        <>
            <Helmet>
                <title>Contrato Gestión</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACT_TOPICO} permission={AuthPermission.READ}>
                <ContractTopicoManagementView id={id} action={action} />
            </RoutePermissionGuard>
        </>
    );
}

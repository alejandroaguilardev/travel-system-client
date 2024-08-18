import { Helmet } from 'react-helmet-async';
import { useAuthContext } from '../../../../../../presentation/auth/hooks';
import { useParams } from '../../../../../../app/routes/hooks';
import { NotFoundView } from './../../../../../../presentation/error';
import { RoutePermissionGuard } from '../../../../../..//app/routes/guard/route-permission.guard';
import { AuthGroup, AuthPermission } from '../../../../../../modules/auth/domain/auth-permission';
import ContractCageUpdateView from '../../../../../../presentation/contracts/views/cage/contract-cage-update-view';

export default function ContractCageIdPage() {
    const { user } = useAuthContext();
    const params = useParams();
    const { id } = params;
    if (!id) {
        return <NotFoundView />;
    }

    return (
        <>
            <Helmet>
                <title>Contrato Jaulas</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACT_CAGE} permission={AuthPermission.READ}>
                <ContractCageUpdateView id={id} />
            </RoutePermissionGuard>
        </>
    );
}

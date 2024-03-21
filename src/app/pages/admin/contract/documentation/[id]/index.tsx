import { Helmet } from 'react-helmet-async';
import { useParams } from '../../../../../../app/routes/hooks';
import { RoutePermissionGuard } from '../../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../../modules/auth/domain/auth-permission';
import ContractDocumentationUpdateView from '../../../../../../presentation/contracts/views/documentation/contract-documentation-update-view';
import { NotFoundView } from '../../../../../../presentation/error';

export default function ContractHistorialPage() {
    const { user } = useAuthContext();
    const params = useParams();
    const { id } = params;

    if (!id) {
        return <NotFoundView />;
    }

    return (
        <>
            <Helmet>
                <title>Documentación</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.DOCUMENTATION}>
                <ContractDocumentationUpdateView id={id} />
            </RoutePermissionGuard>
        </>
    );
}
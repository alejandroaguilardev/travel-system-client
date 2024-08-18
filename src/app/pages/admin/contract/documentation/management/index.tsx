import { Helmet } from 'react-helmet-async';
import { useParams } from '../../../../../routes/hooks';
import { NotFoundView } from '../../../../../../presentation/error';
import { RoutePermissionGuard } from '../../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../../modules/auth/domain/auth-permission';
import ContractDocumentationUpdateView from '../../../../../../presentation/contracts/views/documentation/contract-documentation-update-view';


export default function ContractDocumentationManagementPage() {
    const { user } = useAuthContext();

    const params = useParams();
    const { id, action } = params;

    if (!id) {
        return <NotFoundView />;
    }

    return (
        <>
            <Helmet>
                <title>Documentación</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACT_DOCUMENTATION} permission={AuthPermission.READ}>
                <ContractDocumentationUpdateView id={id} action={action} />
            </RoutePermissionGuard>
        </>
    );
}

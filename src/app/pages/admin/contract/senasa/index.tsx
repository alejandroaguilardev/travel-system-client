import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractSENASAView from '../../../../../presentation/contracts/views/senasa';


export default function ContractSENASAPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Inspección SENASA</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.CREATE}>
                <ContractSENASAView />
            </RoutePermissionGuard>
        </>
    );
}

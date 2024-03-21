import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractAssignPetView from '../../../../../presentation/contracts/views/crud/contract-assign-pet';


export default function ContractAssignPetPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Contrato Seleccionar Mascota</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.CREATE}>
                <ContractAssignPetView />
            </RoutePermissionGuard>
        </>
    );
}

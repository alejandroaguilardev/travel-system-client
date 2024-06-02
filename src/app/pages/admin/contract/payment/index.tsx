import { Helmet } from 'react-helmet-async';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractPaymentView from '../../../../../presentation/contracts/views/payment/contract-payment';


export default function ContractListPaymentPage() {
    const { user } = useAuthContext();

    return (
        <>
            <Helmet>
                <title>Lista de pagos</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.LIST}>
                <ContractPaymentView />
            </RoutePermissionGuard>
        </>
    );
}
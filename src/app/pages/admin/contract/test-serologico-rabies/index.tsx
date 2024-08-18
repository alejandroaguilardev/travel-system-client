import { Helmet } from 'react-helmet-async';
import { MRT_ColumnFiltersState } from 'material-react-table';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractTestRabiesView from '../../../../../presentation/contracts/views/rabies/contract-test-rabies';
import { CONTRACT_STATUS_IN_COURSE } from '../../../../../presentation/contracts/helpers/column-query-filters-status';


export default function ContractTestRabiesPage() {
    const { user } = useAuthContext();
    const columnQueryFilters: MRT_ColumnFiltersState = [...CONTRACT_STATUS_IN_COURSE];

    return (
        <>
            <Helmet>
                <title>Test serológico de rabia</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACT_TOPICO} permission={AuthPermission.LIST}>
                <ContractTestRabiesView columnQueryFilters={columnQueryFilters} />
            </RoutePermissionGuard>
        </>
    );
}

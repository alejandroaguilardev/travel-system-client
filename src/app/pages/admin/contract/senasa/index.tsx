import { Helmet } from 'react-helmet-async';
import { MRT_ColumnFiltersState } from 'material-react-table';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractSENASAView from '../../../../../presentation/contracts/views/senasa/contract-senasa-view';
import { CONTRACT_STATUS_IN_COURSE } from '../../../../../presentation/contracts/helpers/column-query-filters-status';


export default function ContractSENASAPage() {
    const { user } = useAuthContext();
    const columnQueryFilters: MRT_ColumnFiltersState = [
        ...CONTRACT_STATUS_IN_COURSE,
    ];

    return (
        <>
            <Helmet>
                <title>Inspección SENASA</title>
            </Helmet>
            <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.DOCUMENTATION}>
                <ContractSENASAView columnQueryFilters={columnQueryFilters} title='Inspección Senasa' />
            </RoutePermissionGuard>
        </>
    );
}

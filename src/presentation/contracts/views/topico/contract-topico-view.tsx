import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { ContractTable } from '../../components/table/contract-table';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';

export default function ContractTopicoView() {

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Fase Topico"
                links={[
                    { name: 'Topico', href: paths.dashboard.contracts.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={
                    <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.CREATE}>
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.contracts.new}
                            variant="contained"
                        >
                            Nuevo Contrato
                        </Button>
                    </PermissionGuard>
                }
            />
            <ContractTable
                options={{
                    columnQueryFilters: [...CONTRACT_STATUS_IN_COURSE],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActions: (row) => <Button
                        component={RouterLink}
                        href={paths.dashboard.contractCage.update(row.id)} variant='contained' fullWidth
                    >
                        Gestionar
                    </Button>
                }}
            />
        </Container>
    );
}

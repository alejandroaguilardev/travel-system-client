import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { ContractTable } from '../../components/table/contract-table';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';

export default function ContractCageView() {

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Fase Reserva"
                links={[
                    { name: 'Contratos', href: paths.dashboard.contracts.root },
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
                    columnQueryFilters: [],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActions: (row) => <Button
                        component={RouterLink}
                        href={paths.dashboard.contractTravel.update(row.id)} variant='contained' fullWidth >
                        Gestión
                    </Button>
                }}
            />
        </Container>
    );
}

import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { ContractTable } from '../../components/table/contract-table';
import { useColumnsTravel } from '../../components/table/columns/use-columns-travel';

export default function ContractCageView() {
    const columns = useColumnsTravel();
    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Fase Reserva"
                links={[
                    { name: 'Contratos', href: paths.dashboard.contractTravel.list },
                    {
                        name: 'Listado',
                    }
                ]}
            />
            <ContractTable
                options={{
                    columns,
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

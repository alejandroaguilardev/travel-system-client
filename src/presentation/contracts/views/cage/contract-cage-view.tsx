import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { ContractTable } from '../../components/table/contract-table';
import { CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';
import { useColumnsCage } from '../../components/table/columns/use-columns-cage';

export default function ContractCageView() {
    const columns = useColumnsCage();

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Fase Jaula"
                links={[
                    { name: 'Contratos', href: paths.dashboard.contractCage.list },
                    {
                        name: 'Listado',
                    }
                ]}
            />
            <ContractTable
                options={{
                    columns,
                    columnQueryFilters: [...CONTRACT_STATUS_IN_COURSE],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActions: (row) => <Button
                        component={RouterLink}
                        href={paths.dashboard.contractCage.update(row.id)} variant='contained' fullWidth >
                        Sel.
                    </Button>
                }}
            />
        </Container>
    );
}

import { useState } from 'react';
import { Button, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { useSelectedValue } from '../../../../hooks';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { ContractTable } from '../../components/table/contract-table';
import { useColumnsPayment } from '../../components/table/columns/use-columns-payment';
import { UpdatePaymentForm } from '../../components/payment/update-payment-form';
import { CONTRACT_SORT_PENDING_DEFAULT } from '../../helpers/column-query-filters-status';

export default function ContractPaymentView() {
    const columns = useColumnsPayment();
    const { selected, handleSelected } = useSelectedValue<Contract>();
    const [isLoading, setIsLoading] = useState(false);

    const callback = () => {
        handleSelected(null);
    }

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Cuotas por pagar"
                links={[
                    { name: 'Contratos', href: paths.dashboard.contracts.root },
                    {
                        name: 'Listado',
                    }
                ]}
            />
            {!isLoading && <ContractTable
                options={{
                    columns,
                    sortingQueryFilters: [...CONTRACT_SORT_PENDING_DEFAULT],
                    renderRowActions: (row) => <Button variant='contained' fullWidth onClick={() => handleSelected(row)}>
                        Revisar
                    </Button>
                }}
            />}

            {selected &&
                <Dialog open={!!selected} onClose={() => handleSelected(null)} maxWidth="xl" fullWidth>
                    <DialogTitle mx={2} my={0} textAlign="center">Lista de Pagos</DialogTitle>
                    <DialogContent sx={{ p: 5 }}>
                        <UpdatePaymentForm
                            setLoading={setIsLoading}
                            contract={selected}
                            callback={callback}
                            onCancel={() => handleSelected(null)} />
                    </DialogContent>
                </Dialog>
            }

        </Container>
    );
}

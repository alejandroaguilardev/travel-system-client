import { Button, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { useSelectedValue } from '../../../../hooks';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { ContractTable } from '../../components/table/contract-table';
import { AssignNumberForm } from '../../components/assign-number-form/assign-number-form';
import { useState } from 'react';
import { CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';

export default function ContractAssignNumberView() {
    const { selected, handleSelected } = useSelectedValue<Contract>();
    const [isLoading, setIsLoading] = useState(false);

    const callback = () => {
        handleSelected(null);
    }

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Asignación de Número de contrato"
                links={[
                    { name: 'Contratos', href: paths.dashboard.contracts.root },
                    {
                        name: 'Listado',
                    }
                ]}
            />
            {!isLoading && <ContractTable
                options={{
                    columnQueryFilters: [
                        ...CONTRACT_STATUS_IN_COURSE,
                        {
                            id: "number",
                            value: ""
                        }
                    ],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActions: (row) => <Button variant='contained' fullWidth onClick={() => handleSelected(row)}>
                        Asignar
                    </Button>
                }}
            />}

            {selected &&
                <Dialog open={!!selected} onClose={() => handleSelected(null)} maxWidth="md" fullWidth>
                    <DialogTitle mx={2} my={0} textAlign="center">Asignar Folio y Número de contrato</DialogTitle>
                    <DialogContent sx={{ p: 5 }}>
                        <AssignNumberForm
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

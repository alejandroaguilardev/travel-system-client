import { Button, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { useSelectedValue } from '../../../../hooks';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { ContractTable } from '../../components/table/contract-table';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { AssignNumberForm } from '../../components/assign-number-form/assign-number-form';
import { useState } from 'react';

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
            {!isLoading && <ContractTable
                options={{
                    columnQueryFilters: [
                        {
                            id: "number",
                            value: ""
                        }],
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

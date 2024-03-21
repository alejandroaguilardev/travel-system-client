import { Button, Container, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { useSelectedValue } from '../../../../hooks';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { ContractTable } from '../../components/table/contract-table';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { useState } from 'react';
import { ValidateDetails } from '../../components/assign-pet-form/validate-details';
import { PetDialogProvider } from '../../../pets/components/search/pet-dialog-context';
import { ClientDialogProvider } from '../../../client/components/search-client/client-dialog-context';

export default function ContractAssignPetView() {
    const { selected, handleSelected } = useSelectedValue<Contract>();
    const [isLoading, setIsLoading] = useState(false);

    const callback = () => {
        handleSelected(null);
    }

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Seleccionar mascota"
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
                    columnQueryFilters: [{
                        id: "details.pet",
                        value: "",
                    }],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActions: (row) => <Button variant='contained' fullWidth onClick={() => handleSelected(row)}>
                        Asignar
                    </Button>
                }}
            />}

            {selected &&
                <Dialog open={!!selected} onClose={() => handleSelected(null)} maxWidth="md" fullWidth>
                    <DialogTitle mx={2} my={0} textAlign="center">Seleccionar las mascotas en el contrato</DialogTitle>
                    <DialogContent sx={{ p: 5 }}>
                        <PetDialogProvider>
                            <ClientDialogProvider>
                                <ValidateDetails
                                    setLoading={setIsLoading}
                                    contract={selected}
                                    callback={callback}
                                    onCancel={() => handleSelected(null)} />
                            </ClientDialogProvider>
                        </PetDialogProvider>
                    </DialogContent>
                </Dialog>
            }

        </Container>
    );
}

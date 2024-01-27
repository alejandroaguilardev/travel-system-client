import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../hooks';
import { Contract } from '../../../modules/contracts/domain/contract';
import { ContractTable } from '../components/table/contract-table';
import { DialogDelete } from '../../../components/delete-item/delete-dialog-button';
import { useDeleteContract } from '../hooks/use-delete-contract';
import { ContractRenderRowActionsMenuItems } from '../components/table/contract-render-row-actions-menu-items';


export default function ContractView() {
    const { selected, handleSelected } = useSelectedValue<Contract>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeleteContract()

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Contratos"
                links={[
                    { name: 'Contratos', href: paths.dashboard.contracts.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={

                    <Button
                        component={RouterLink}
                        href={paths.dashboard.contracts.new}
                        variant="contained"
                    >
                        Nuevo Contrato
                    </Button>
                }
            />
            {!isLoading &&
                <ContractTable
                    options={{
                        renderRowActionMenuItems: (row: Contract) => ContractRenderRowActionsMenuItems({ row, deleteItem: deleteItem.onTrue, onSelected: handleSelected })
                    }}
                />
            }

            {deleteItem.value && selected &&
                <DialogDelete
                    open={deleteItem.value}
                    onAccept={() => handleDelete(selected.id, deleteItem.onFalse)}
                    onClose={deleteItem.onFalse}
                    onCancel={deleteItem.onFalse}
                />
            }
        </Container>
    );
}

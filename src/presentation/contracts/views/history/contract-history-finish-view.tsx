import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { useBoolean, useSelectedValue } from '../../../../hooks';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { ContractTable } from '../../components/table/contract-table';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { CONTRACT_STATUS_FINISH } from '../../helpers/column-query-filters-status';
import { ContractRenderRowActionsMenuItems } from '../../components/table/contract-render-row-actions-menu-items';
import { useDeleteContract } from '../../hooks/use-delete-contract';
import { DialogDelete } from '../../../../components/delete-item/delete-dialog-button';

export default function ContractHistoryFinishView() {
    const { selected, handleSelected } = useSelectedValue<Contract>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeleteContract()


    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Historial de contratos Finalizados"
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
            {!isLoading &&
                <ContractTable

                    options={{
                        columnQueryFilters: [
                            ...CONTRACT_STATUS_FINISH,
                        ],
                        sortingQueryFilters: [{ id: "startDate", desc: true }],
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

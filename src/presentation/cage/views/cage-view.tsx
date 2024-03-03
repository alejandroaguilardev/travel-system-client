import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../hooks';
import { Cage } from '../../../modules/cages/domain/cage';
import { CageTable } from '../components/table/cage-table';
import { DialogDelete } from '../../../components/delete-item/delete-dialog-button';
import { useDeleteCage } from '../hooks/use-delete-cage';
import { PermissionGuard } from '../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';


export default function CageView() {
    const { selected, handleSelected } = useSelectedValue<Cage>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeleteCage()

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Jaulas"
                links={[
                    { name: 'Jaulas', href: paths.dashboard.cages.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={
                    <PermissionGuard group={AuthGroup.CAGES} permission={AuthPermission.CREATE}>
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.cages.new}
                            variant="contained"
                        >
                            Nueva Jaula
                        </Button>
                    </PermissionGuard>
                }
            />
            {!isLoading &&
                <CageTable
                    onSelected={handleSelected}
                    deleteItem={deleteItem.onTrue}
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

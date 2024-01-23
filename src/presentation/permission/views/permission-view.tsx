import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../hooks';
import { Permission } from '../../../modules/permissions/domain/permission';
import { PermissionTable } from '../components/table/permission-table';
import { DialogDelete } from '../../../components/delete-item/delete-dialog-button';
import { useDeletePermission } from '../hooks/use-delete-permission';


export default function PermissionView() {
    const { selected, handleSelected } = useSelectedValue<Permission>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeletePermission()

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Permisos"
                links={[
                    { name: 'Permisos', href: paths.dashboard.permissions.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={

                    <Button
                        component={RouterLink}
                        href={paths.dashboard.permissions.new}
                        variant="contained"
                    >
                        Nuevo Permiso
                    </Button>
                }
            />
            {!isLoading &&
                <PermissionTable
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

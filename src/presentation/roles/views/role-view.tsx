import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../hooks';
import { Role } from '../../../modules/roles/domain/role';
import { RoleTable } from '../components/table/role-table';
import { DialogDelete } from '../../../components/delete-item/delete-dialog-button';
import { useDeleteRole } from '../hooks/use-delete-role';


export default function RoleView() {
    const { selected, handleSelected } = useSelectedValue<Role>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeleteRole()

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Roles"
                links={[
                    { name: 'Roles', href: paths.dashboard.roles.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={

                    <Button
                        component={RouterLink}
                        href={paths.dashboard.roles.new}
                        variant="contained"
                    >
                        Nuevo Rol
                    </Button>
                }
            />
            {!isLoading &&
                <RoleTable
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

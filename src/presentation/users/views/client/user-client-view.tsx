import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../../hooks';
import { User } from '../../../../modules/users/domain/user';
import { UserTable } from '../../components/table/user-table';
import { DialogDelete } from '../../../../components/delete-item/delete-dialog-button';
import { useDeleteUser } from '../../hooks/use-delete-user';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';

export default function UserClientView() {
    const { selected, handleSelected } = useSelectedValue<User>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeleteUser()

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Clientes"
                links={[
                    { name: "Clientes", href: paths.dashboard.users.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={
                    <PermissionGuard group={AuthGroup.USERS} permission={AuthPermission.CREATE}>
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.clients.new}
                            variant="contained"
                        >
                            Nuevo Cliente
                        </Button>
                    </PermissionGuard>
                }
            />
            {!isLoading &&
                <UserTable
                    onSelected={handleSelected}
                    deleteItem={deleteItem.onTrue}
                    filteredColumns={['profile.document', 'profile.documentNumber', 'profile.name', 'profile.lastName', 'email', 'profile.phone']}
                    path='clients'
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

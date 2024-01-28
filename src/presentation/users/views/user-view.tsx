import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../hooks';
import { User } from '../../../modules/users/domain/user';
import { UserTable } from '../components/table/user-table';
import { DialogDelete } from '../../../components/delete-item/delete-dialog-button';
import { useDeleteUser } from '../hooks/use-delete-user';


type Props = {
    type?: "Cliente" | "Usuario";
}

export default function UserView({ type = "Usuario" }: Props) {
    const { selected, handleSelected } = useSelectedValue<User>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeleteUser()

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Usuarios"
                links={[
                    { name: type + "s", href: paths.dashboard.users.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={

                    <Button
                        component={RouterLink}
                        href={paths.dashboard.users.new}
                        variant="contained"
                    >
                        Nuevo {type}
                    </Button>
                }
            />
            {!isLoading &&
                <UserTable
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

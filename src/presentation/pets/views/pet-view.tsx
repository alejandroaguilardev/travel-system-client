import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../hooks';
import { Pet } from '../../../modules/pets/domain/pet';
import { PetTable } from '../components/table/pet-table';
import { DialogDelete } from '../../../components/delete-item/delete-dialog-button';
import { useDeletePet } from '../hooks/use-delete-pet';
import { PermissionGuard } from '../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';


export default function PetView() {
    const { selected, handleSelected } = useSelectedValue<Pet>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeletePet()

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Mascotas"
                links={[
                    { name: 'Mascotas', href: paths.dashboard.pets.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={
                    <PermissionGuard group={AuthGroup.PETS} permission={AuthPermission.CREATE}>
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.pets.new}
                            variant="contained"
                        >
                            Nueva Mascota
                        </Button>
                    </PermissionGuard>
                }
            />
            {!isLoading &&
                <PetTable
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

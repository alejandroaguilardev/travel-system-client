import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../hooks';
import { Folder } from '../../../modules/folders/domain/folder';
import { FolderTable } from '../components/table/folder-table';
import { DialogDelete } from '../../../components/delete-item/delete-dialog-button';
import { useDeleteFolder } from '../hooks/use-delete-folder';
import { PermissionGuard } from '../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';


export default function FolderView() {
    const { selected, handleSelected } = useSelectedValue<Folder>();
    const deleteItem = useBoolean();
    const { handleDelete, isLoading } = useDeleteFolder()

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Gestión de Expedientes"
                links={[
                    { name: 'Expedientes', href: paths.dashboard.folders.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={
                    <PermissionGuard group={AuthGroup.FOLDERS} permission={AuthPermission.CREATE}>
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.folders.new}
                            variant="contained"
                        >
                            Nueva Expediente
                        </Button>
                    </PermissionGuard>
                }
            />
            {!isLoading &&
                <FolderTable
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

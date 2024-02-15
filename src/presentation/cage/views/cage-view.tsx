import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue, useBoolean } from '../../../hooks';
import { Cage } from '../../../modules/cages/domain/cage';
import { CageTable } from '../components/table/cage-table';
import { DialogDelete } from '../../../components/delete-item/delete-dialog-button';
import { useDeleteCage } from '../hooks/use-delete-cage';


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

                    <Button
                        component={RouterLink}
                        href={paths.dashboard.cages.new}
                        variant="contained"
                    >
                        Nuevo Permiso
                    </Button>
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

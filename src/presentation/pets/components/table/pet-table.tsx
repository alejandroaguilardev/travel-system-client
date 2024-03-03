import { FC, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Pet } from '../../../../modules/pets/domain/pet';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { paths } from '../../../../app/routes/paths';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { petGlobalFilterProperties } from './pet-global-filter-properties';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';

type Props = {
    onSelected: (pet: Pet) => void;
    deleteItem: () => void;
}

export const PetTable: FC<Props> = ({ onSelected, deleteItem, }) => {

    const columns = useMemo<MRT_ColumnDef<Pet>[]>(
        () => [
            {
                header: 'Fecha de nacimiento',
                accessorKey: 'birthDate',
                accessorFn: (row) => fDate(row?.birthDate),
                minSize: 200
            },
            {
                header: 'Nombre',
                accessorKey: 'name',
                accessorFn: (row) => row?.name,
                minSize: 200
            },
            {
                header: 'Chip',
                accessorKey: 'chip',
                accessorFn: (row) => row?.chip,
                minSize: 200
            },
            {
                header: 'Tipo',
                accessorKey: 'gender',
                accessorFn: (row) => row?.type,
                minSize: 200
            },
            {
                header: 'Raza',
                accessorKey: 'gender',
                accessorFn: (row) => row?.race,
                minSize: 200
            },
        ],
        [],
    );

    return (
        <TablePagination<Pet>
            name={PetTable?.displayName || 'table'}
            collection={COLLECTIONS.pets}
            columns={columns}
            globalFilterProperties={petGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [
                <PermissionGuard group={AuthGroup.PETS} permission={AuthPermission.READ} key="view">
                    <RenderRowActionMenuItem
                        item={{
                            name: "Visualizar",
                            icon: "eyeBold",
                            href: paths.dashboard.pets.view(row.original.id)
                        }}
                    />
                </PermissionGuard>,
                <PermissionGuard group={AuthGroup.PETS} permission={AuthPermission.EDIT} key="edit">
                    <RenderRowActionMenuItem
                        item={{
                            name: "Editar",
                            icon: "editTable",
                            href: paths.dashboard.pets.edit(row.original.id)
                        }}
                    />
                </PermissionGuard>,
                <PermissionGuard group={AuthGroup.PETS} permission={AuthPermission.DELETE}>
                    <RenderRowActionMenuItemButton<Pet>
                        item={{
                            name: "Eliminar",
                            icon: "removeBox",
                        }}
                        row={row.original}
                        onSelected={(value) => {
                            onSelected(value);
                            deleteItem();
                        }}
                        key="remove"
                    />
                </PermissionGuard>
            ]}
        />
    )
}
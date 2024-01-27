import { FC, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Permission } from '../../../../modules/permissions/domain/permission';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { paths } from '../../../../app/routes/paths';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { userGlobalFilterProperties } from './permission-global-filter-properties';


type Props = {
    onSelected: (permission: Permission) => void;
    deleteItem: () => void;
}

export const PermissionTable: FC<Props> = ({ onSelected, deleteItem, }) => {
    const columns = useMemo<MRT_ColumnDef<Permission>[]>(
        () => [
            {
                header: 'Nombre',
                accessorKey: 'name',
                accessorFn: (row) => row.name.toUpperCase(),
                minSize: 200
            },
            {
                header: 'Grupo',
                accessorKey: 'group',
                accessorFn: (row) => row.group.toUpperCase(),
                minSize: 200
            },

            {
                header: 'Descripción',
                accessorKey: 'description',
                accessorFn: (row) => row.description.length > 50 ? row.description.slice(0, 50) + "..." : row.description,
                minSize: 400

            },
        ],
        [],
    );


    return (
        <TablePagination<Permission>
            name={PermissionTable?.displayName || 'table'}
            collection={COLLECTIONS.permissions}
            columns={columns}
            globalFilterProperties={userGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [<RenderRowActionMenuItem
                item={{
                    name: "Visualizar",
                    icon: "eyeBold",
                    href: paths.dashboard.permissions.view(row.original.id)
                }}
                key="view"
            />,
            <RenderRowActionMenuItem
                item={{
                    name: "Editar",
                    icon: "editTable",
                    href: paths.dashboard.permissions.edit(row.original.id)
                }}
                key="edit"
            />,
            <RenderRowActionMenuItemButton<Permission>
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
            />]}
        />
    )
}

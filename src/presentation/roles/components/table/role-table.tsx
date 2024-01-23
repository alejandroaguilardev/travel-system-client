import { FC, useMemo } from 'react';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { Role } from '../../../../modules/roles/domain/role';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { paths } from '../../../../app/routes/paths';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { userGlobalFilterProperties } from './role-global-filter-properties';


type Props = {
    onSelected: (role: Role) => void;
    deleteItem: () => void;
}

export const RoleTable: FC<Props> = ({ onSelected, deleteItem, }) => {
    const columns = useMemo<MRT_ColumnDef<Role>[]>(
        () => [
            {
                header: 'Nombre',
                accessorKey: 'name',
                accessorFn: (row) => row.name.toUpperCase(),
                minSize: 200
            },
            {
                header: 'Permisos',
                accessorKey: 'permissions',
                accessorFn: (row) => row.permissions.reduce((prev) => prev + 1, 0),
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
        <TablePagination<Role>
            name={RoleTable?.displayName || 'table'}
            collection={COLLECTIONS.roles}
            columns={columns}
            globalFilterProperties={userGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [<RenderRowActionMenuItem<MRT_Row<Role>>
                item={{
                    name: "Visualizar",
                    icon: "eyeBold",
                    href: paths.dashboard.roles.view(row.original.id)
                }}
                key="view"
            />,
            <RenderRowActionMenuItem<MRT_Row<Role>>
                item={{
                    name: "Editar",
                    icon: "editTable",
                    href: paths.dashboard.roles.edit(row.original.id)
                }}
                key="edit"
            />,
            <RenderRowActionMenuItemButton<Role>
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

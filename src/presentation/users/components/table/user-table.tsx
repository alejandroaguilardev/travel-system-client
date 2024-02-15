import { FC, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { User } from '../../../../modules/users/domain/user';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { paths } from '../../../../app/routes/paths';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { userGlobalFilterProperties } from './user-global-filter-properties';


type Props = {
    onSelected: (user: User) => void;
    deleteItem: () => void;
}

export const UserTable: FC<Props> = ({ onSelected, deleteItem, }) => {
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                header: 'Nombre',
                accessorKey: 'name',
                accessorFn: (row) => row.profile.name.toUpperCase(),
                minSize: 200
            },
            {
                header: 'Apellido',
                accessorKey: 'lastName',
                accessorFn: (row) => row.profile.lastName.toUpperCase(),
                minSize: 200
            },
            {
                header: 'Email',
                accessorKey: 'email',
                accessorFn: (row) => row.email.toUpperCase(),
                minSize: 200
            },

            {
                header: 'Roles',
                accessorKey: 'roles',
                accessorFn: (row) => row.roles.map(_ => _.name).join(","),
                minSize: 200
            },
        ],
        [],
    );


    return (
        <TablePagination<User>
            name={UserTable?.displayName || 'table'}
            collection={COLLECTIONS.users}
            columns={columns}
            globalFilterProperties={userGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [<RenderRowActionMenuItem
                item={{
                    name: "Visualizar",
                    icon: "eyeBold",
                    href: paths.dashboard.users.view(row.original.id)
                }}
                key="view"
            />,
            <RenderRowActionMenuItem
                item={{
                    name: "Editar",
                    icon: "editTable",
                    href: paths.dashboard.users.edit(row.original.id)
                }}
                key="edit"
            />,
            <RenderRowActionMenuItemButton<User>
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

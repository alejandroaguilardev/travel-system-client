import { FC, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { NewUser, User } from '../../../../modules/users/domain/user';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { paths } from '../../../../app/routes/paths';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { userGlobalFilterProperties } from './user-global-filter-properties';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { columnUtils } from '../../../../modules/shared/infrastructure/helpers/column-utils';


type Props = {
    onSelected: (user: User) => void;
    deleteItem: () => void;
    filteredColumns?: (keyof NewUser)[] | string[];
    path: 'users' | 'clients'
}

export const UserTable: FC<Props> = ({ onSelected, deleteItem, path, filteredColumns = [] }) => {
    const allColumns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                header: 'Nombre',
                accessorKey: 'profile.name',
                accessorFn: (row) => row.profile.name.toUpperCase(),
                minSize: 200
            },
            {
                header: 'Apellido',
                accessorKey: 'profile.lastName',
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
                header: 'Teléfono',
                accessorKey: 'profile.phone',
                accessorFn: (row) => row.profile.phone,
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
    const columns: MRT_ColumnDef<User>[] = useMemo(() => columnUtils.getOrderedColumns<User>(allColumns, filteredColumns), [filteredColumns, allColumns]);


    return (
        <TablePagination<User>
            name={UserTable?.displayName || 'table'}
            collection={COLLECTIONS.users}
            columns={columns}
            globalFilterProperties={userGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [
                <PermissionGuard group={AuthGroup.USERS} permission={AuthPermission.READ} key="view">
                    <RenderRowActionMenuItem
                        item={{
                            name: "Visualizar",
                            icon: "eyeBold",
                            href: paths.dashboard[path].view(row.original.id)
                        }}

                    />
                </PermissionGuard>,
                <PermissionGuard group={AuthGroup.USERS} permission={AuthPermission.EDIT} key="edit">
                    <RenderRowActionMenuItem
                        item={{
                            name: "Editar",
                            icon: "editTable",
                            href: paths.dashboard[path].edit(row.original.id)
                        }}
                    />
                </PermissionGuard>,
                <PermissionGuard group={AuthGroup.USERS} permission={AuthPermission.DELETE} key="remove">
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
                    />
                </PermissionGuard>
            ]}
        />
    )
}

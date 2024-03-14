import { FC, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Folder } from '../../../../modules/folders/domain/folder';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { paths } from '../../../../app/routes/paths';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { folderGlobalFilterProperties } from './folder-global-filter-properties';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';


type Props = {
    onSelected: (folder: Folder) => void;
    deleteItem: () => void;
}

export const FolderTable: FC<Props> = ({ onSelected, deleteItem, }) => {
    const columns = useMemo<MRT_ColumnDef<Folder>[]>(
        () => [
            {
                header: 'Nombre del Folder',
                accessorKey: 'name',
                accessorFn: (row) => row.name.toUpperCase(),
                minSize: 400
            },
            {
                header: 'Cantidad de sobres',
                accessorKey: 'quantity',
                accessorFn: (row) => row.quantity,
                minSize: 250
            },
        ],
        [],
    );


    return (
        <TablePagination<Folder>
            name={FolderTable?.displayName || 'table'}
            collection={COLLECTIONS.folders}
            columns={columns}
            globalFilterProperties={folderGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [
                <PermissionGuard group={AuthGroup.FOLDERS} permission={AuthPermission.READ} key="view">
                    <RenderRowActionMenuItem
                        item={{
                            name: "Visualizar",
                            icon: "eyeBold",
                            href: paths.dashboard.folders.view(row.original.id)
                        }}
                    />
                </PermissionGuard>,
                <PermissionGuard group={AuthGroup.FOLDERS} permission={AuthPermission.EDIT} key="edit">
                    <RenderRowActionMenuItem
                        item={{
                            name: "Editar",
                            icon: "editTable",
                            href: paths.dashboard.folders.edit(row.original.id)
                        }}
                    />
                </PermissionGuard>,
                <PermissionGuard group={AuthGroup.FOLDERS} permission={AuthPermission.DELETE}>
                    <RenderRowActionMenuItemButton<Folder>
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

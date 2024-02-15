import { FC, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { Cage } from '../../../../modules/cages/domain/cage';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { paths } from '../../../../app/routes/paths';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { cageGlobalFilterProperties } from './cage-global-filter-properties';


type Props = {
    onSelected: (cage: Cage) => void;
    deleteItem: () => void;
}

export const CageTable: FC<Props> = ({ onSelected, deleteItem, }) => {
    const columns = useMemo<MRT_ColumnDef<Cage>[]>(
        () => [
            {
                header: 'Tipo',
                accessorKey: 'type',
                accessorFn: (row) => row.typeCage.toUpperCase(),
                minSize: 200
            },
            {
                header: 'Modelo',
                accessorKey: 'group',
                accessorFn: (row) => row.modelCage.toUpperCase(),
                minSize: 200
            },

            {
                header: 'Dimensiones',
                accessorKey: 'description',
                accessorFn: (row) => row.dimensionsCage.toUpperCase(),
                minSize: 200
            },
        ],
        [],
    );


    return (
        <TablePagination<Cage>
            name={CageTable?.displayName || 'table'}
            collection={COLLECTIONS.cages}
            columns={columns}
            globalFilterProperties={cageGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [<RenderRowActionMenuItem
                item={{
                    name: "Visualizar",
                    icon: "eyeBold",
                    href: paths.dashboard.cages.view(row.original.id)
                }}
                key="view"
            />,
            <RenderRowActionMenuItem
                item={{
                    name: "Editar",
                    icon: "editTable",
                    href: paths.dashboard.cages.edit(row.original.id)
                }}
                key="edit"
            />,
            <RenderRowActionMenuItemButton<Cage>
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

import { FC, useMemo } from 'react';
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { paths } from '../../../../app/routes/paths';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import Label from '../../../../components/label/label';
import { statusColor } from './status-color';
import { contractGlobalFilterProperties } from './contract-global-filter-properties';


type Props = {
    onSelected: (contract: Contract) => void;
    deleteItem: () => void;
}

export const ContractTable: FC<Props> = ({ onSelected, deleteItem, }) => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'Fecha de Inicio',
                accessorKey: 'startDate',
                accessorFn: (row) => fDate(row.startDate, 'dd/MM/yyyy HH:mm:ss'),
                minSize: 200
            },
            {
                header: 'Número',
                accessorKey: 'number',
                minSize: 200
            },
            {
                header: 'Estado',
                accessorKey: 'status',
                Cell: ({ cell }) => {
                    const { status } = cell.row.original
                    return <Label color={statusColor(status)}>{CONTRACT_STATUS.find(_ => _.value === status)?.label}</Label>
                },
                accessorFn: (row) => row.status,
                minSize: 200
            },
            {
                header: 'Fecha de Finalización',
                accessorKey: 'endDate',
                accessorFn: (row) => row.endDate ? fDate(row.endDate, 'dd/MM/yyyy HH:mm:ss') : "--",
                minSize: 200
            },
        ],
        [],
    );


    return (
        <TablePagination<Contract>
            name={ContractTable?.displayName || 'table'}
            collection={COLLECTIONS.contracts}
            columns={columns}
            globalFilterProperties={contractGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [<RenderRowActionMenuItem<MRT_Row<Contract>>
                item={{
                    name: "Visualizar",
                    icon: "eyeBold",
                    href: paths.dashboard.contracts.view(row.original.id)
                }}
                key="view"
            />,
            <RenderRowActionMenuItem<MRT_Row<Contract>>
                item={{
                    name: "Editar",
                    icon: "editTable",
                    href: paths.dashboard.contracts.edit(row.original.id)
                }}
                key="edit"
            />,
            <RenderRowActionMenuItemButton<Contract>
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

import { FC, ReactNode, useMemo } from 'react';
import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_SortingState } from 'material-react-table';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import Label from '../../../../components/label/label';
import { statusColor } from './status-color';
import { contractGlobalFilterProperties } from './contract-global-filter-properties';


type Props = {
    options?: {
        columnQueryFilters?: MRT_ColumnFiltersState | undefined;
        sortingQueryFilters?: MRT_SortingState | undefined;
        renderRowActionMenuItems?: (row: Contract) => ReactNode[]
    }
}

export const ContractTable: FC<Props> = ({ options }) => {
    const { renderRowActionMenuItems, columnQueryFilters, sortingQueryFilters } = options ?? {};
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
            columnQueryFilters={columnQueryFilters}
            sortingQueryFilters={sortingQueryFilters}
            columns={columns}
            globalFilterProperties={contractGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => renderRowActionMenuItems
                ? renderRowActionMenuItems(row.original)
                : []
            }
        />
    )
}

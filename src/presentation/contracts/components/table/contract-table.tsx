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
import { IconButton } from '@mui/material';
import { IconWrapper } from 'src/components/icon-wrapper';
import { useImpContractContext } from 'src/components/imp-pdf/imp-contract/imp-contract-context';
import { TypeofImp } from '../../../../components/imp-pdf/imp-contract/type-contract';
import { contractDetailStatus, contractDetailsPetNames } from './columns/contract-detail-status';

type Props = {
    options?: {
        columns?: MRT_ColumnDef<Contract>[];
        columnQueryFilters?: MRT_ColumnFiltersState | undefined;
        sortingQueryFilters?: MRT_SortingState | undefined;
        filteredColumns?: (keyof Contract)[];
        renderRowActionMenuItems?: (row: Contract) => ReactNode[];
        renderRowActions?: (row: Contract) => ReactNode;
    }
}

export const ContractTable: FC<Props> = ({ options }) => {
    const { handleTypeImpExecute } = useImpContractContext();
    const { columns, renderRowActionMenuItems, renderRowActions, columnQueryFilters, sortingQueryFilters, filteredColumns = [] } = options ?? {};

    const columnsDefault = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'IMP',
                Cell: ({ row }) => <IconButton onClick={() => handleTypeImpExecute(row.original.id, TypeofImp.VIEWER)}>
                    <IconWrapper icon='pdfLine' color="red" />
                </IconButton>,
                size: 120
            },
            {
                header: 'Estado',
                accessorKey: 'status.petTravel',
                Cell: ({ cell }) => {
                    const { status } = cell.row.original
                    return <Label color={statusColor(status.petTravel)}>{CONTRACT_STATUS.find(_ => _.value === status.petTravel)?.label}</Label>
                },
                accessorFn: (row) => row.status,
                minSize: 170
            },
            {
                header: 'Mascota',
                accessorKey: 'details.profile.lastName',
                accessorFn: ({ details }) => contractDetailsPetNames(details),
                minSize: 170,
                enableColumnFilter: false,
            },
            {
                header: 'N° Documento',
                accessorKey: 'client.profile.documentNumber',
                minSize: 170
            },
            {
                header: 'Nombre',
                accessorKey: 'client.profile.name',
                minSize: 170
            },
            {
                header: 'Apellido',
                accessorKey: 'client.profile.lastName',
                minSize: 170
            },
            {
                header: 'Fecha de Inicio',
                accessorKey: 'startDate',
                accessorFn: (row) => fDate(row.startDate, 'DD/MM/YYYY HH:mm:ss'),
                minSize: 200
            },
            {
                header: 'Fecha de Finalización',
                accessorKey: 'endDate',
                accessorFn: (row) => row.endDate ? fDate(row.endDate, 'DD/MM/YYYY HH:mm:ss') : "--",
                minSize: 200
            },
            {
                header: 'Folio',
                accessorKey: 'folder',
                minSize: 170,
            },
            {
                header: 'F.Número',
                accessorKey: 'number',
                minSize: 170,
            },
            {
                header: 'N° Contracto',
                accessorKey: 'correlative',
                minSize: 170,
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
            columns={columns ?? columnsDefault}
            globalFilterProperties={contractGlobalFilterProperties}
            renderRowActionMenuItems={renderRowActionMenuItems ? ({ row }) =>
                renderRowActionMenuItems(row.original)
                : undefined
            }
            renderRowActions={renderRowActions ?
                ({ row }) => renderRowActions(row.original)
                : undefined}
        />
    )
}

import { FC, useMemo, useState } from 'react';
import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_SortingState } from 'material-react-table';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';
import Label from '../../../../components/label/label';
import { statusColor } from './status-color';
import TableWrapper from '../../../../components/material-table/table-wrapper';
import { materialReactTableToCriteria } from '../../../../components/material-table/helpers/material-react-table-to-criteria';
import { useMaterialReactPagination } from '../../../../hooks/use-material-table-pagination';
import { contractGlobalFilterProperties } from './contract-global-filter-properties';
import { contractService } from '../../../../modules/contracts/infrastructure/contract.service';
import { useSwrQueryPagination } from '../../../../hooks/use-swr-query-pagination';
import MenuItem from '@mui/material/MenuItem';
import IconWrapper from '../../../../components/icon-wrapper/icon-wrapper';
import { useBoolean } from '../../../../hooks/use-boolean';
import { Dialog, DialogContent } from '@mui/material';
import ContractIdView from '../../views/contract-id-view';

type Props = {
    options?: {
        columnQueryFilters?: MRT_ColumnFiltersState | undefined;
        sortingQueryFilters?: MRT_SortingState | undefined;
    }
}

export const ContractClientTable: FC<Props> = ({ options }) => {
    const { columnQueryFilters, sortingQueryFilters } = options ?? {};
    const dialog = useBoolean();
    const [contractId, setContractId] = useState<string | null>(null)


    const { columnFilters, globalFilter, sorting, pagination, setColumnFilters, setGlobalFilter, setPagination, setSorting } = useMaterialReactPagination({
        columnQueryFilters,
        sortingQueryFilters
    });

    const criteria = useMemo(() => materialReactTableToCriteria({
        columnFilters,
        globalFilter,
        sorting,
        pagination,
        selectProperties: [],
        globalFilterProperties: contractGlobalFilterProperties,
    }),
        [columnFilters, globalFilter, pagination, sorting, contractGlobalFilterProperties])

    const { rows, count, isLoading } = useSwrQueryPagination<Contract>({ key: "ContractClientTable", criteria, search: contractService.searchClient })



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
        <>
            <TableWrapper<Contract>
                enableRowActions
                enableHiding
                manualFiltering
                manualPagination
                manualSorting

                columns={columns}
                renderRowActionMenuItems={({ row }) => [
                    <MenuItem key={row.id} onClick={() => {
                        dialog.onTrue();
                        setContractId(row.original.id)
                    }}>
                        <IconWrapper icon="eyeBold" mr={2} />
                        Ver  Contrato
                    </MenuItem >
                ]}
                data={rows}

                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={(state) => {
                    if (!isLoading) setPagination(state);
                }}
                rowCount={count}
                state={{
                    isLoading,
                    columnFilters,
                    globalFilter,
                    pagination,
                    sorting,
                }}
                onSortingChange={setSorting}
            />
            {dialog.value && contractId &&
                <Dialog open={dialog.value} onClose={dialog.onFalse} maxWidth="lg" fullWidth>
                    <DialogContent sx={{ py: 4 }}>
                        <ContractIdView id={contractId} />
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}

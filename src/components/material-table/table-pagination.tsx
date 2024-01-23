import { useMemo } from "react";
import { MRT_SortingState, MRT_ColumnFiltersState } from "material-react-table";
import TableWrapper, { TableWrapperProps } from "./table-wrapper";
import { useMaterialReactPagination } from '../../hooks/use-material-table-pagination';
import { useSwrQueryPagination } from '../../hooks/use-swr-query-pagination';
import { Collections } from '../../modules/shared/domain/collections';
import { materialReactTableToCriteria } from './helpers/material-react-table-to-criteria';
import { GlobalFilterProperties } from '../../modules/shared/domain/criteria/global-filter-properties';
import { conditionPersistence } from "./helpers/condition-persistence";

type TablePaginationProps<T extends Record<string, any>> = Omit<TableWrapperProps<T>, 'data'> & {
    name: string;
    collection: Collections;
    globalFilterProperties: GlobalFilterProperties[];
    columnQueryFilters?: MRT_ColumnFiltersState | undefined;
    sortingQueryFilters?: MRT_SortingState | undefined;
    selectProperties?: string[];
};

export function TablePagination<T extends Record<string, any>>({
    name,
    collection,
    columnQueryFilters,
    sortingQueryFilters,
    selectProperties = [],
    globalFilterProperties = [],
    ...rest
}: TablePaginationProps<T>) {
    const { columnFilters, globalFilter, sorting, pagination, setColumnFilters, setGlobalFilter, setPagination, setSorting } = useMaterialReactPagination({
        columnQueryFilters,
        sortingQueryFilters
    });

    const criteria = useMemo(() => materialReactTableToCriteria({
        columnFilters,
        globalFilter,
        sorting,
        pagination,
        selectProperties,
        globalFilterProperties,
    }),
        [columnFilters, globalFilter, pagination, sorting, globalFilterProperties, selectProperties])

    const { rows, count, isLoading } = useSwrQueryPagination<T>({ key: name, criteria, search: conditionPersistence(collection) })


    return (
        <TableWrapper<T>
            enableRowActions
            enableHiding
            manualFiltering
            manualPagination
            manualSorting
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
            {...rest}
            data={rows}
        />
    )
}

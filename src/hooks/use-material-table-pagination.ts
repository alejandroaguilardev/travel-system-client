import { useState } from "react";
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from "material-react-table";

export const INITIAL_PAGINATION = {
    pageIndex: 0,
    pageSize: 10,
}

interface Props {
    initialPagination?: {
        pageIndex: number,
        pageSize: number,
    },
    columnQueryFilters?: MRT_ColumnFiltersState | undefined,
    sortingQueryFilters?: MRT_SortingState | undefined,
}

export const useMaterialReactPagination = (props?: Props) => {
    const [pagination, setPagination] = useState<MRT_PaginationState>(
        props?.initialPagination ?? INITIAL_PAGINATION);

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        props?.columnQueryFilters ?? []);

    const [sorting, setSorting] = useState<MRT_SortingState>(props?.sortingQueryFilters ?? []);

    const [globalFilter, setGlobalFilter] = useState('');

    return {
        columnFilters,
        globalFilter,
        sorting,
        pagination,
        setGlobalFilter,
        setSorting,
        setPagination,
        setColumnFilters
    }
}

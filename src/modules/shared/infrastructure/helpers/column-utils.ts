import { MRT_ColumnDef } from 'material-react-table';

function getOrderedColumns<T extends Record<string, any>>(
    allColumns: MRT_ColumnDef<T>[],
    filteredColumns: string[]
): MRT_ColumnDef<T>[] {
    const orderedColumns: MRT_ColumnDef<T>[] = [];
    if (filteredColumns.length === 0) return allColumns;

    filteredColumns.forEach((key) => {
        const column = allColumns.find((c) => c.accessorKey === key);
        if (column) {
            orderedColumns.push(column);
        }
    });

    return orderedColumns;
}
function getSelectProperties<T extends Record<string, any>>(
    allColumns: MRT_ColumnDef<T>[]): string[] {
    return allColumns
        .map(column => column.accessorKey)
        .filter(accessorKey => accessorKey !== undefined)
        .map(String)
}


export const columnUtils = {
    getOrderedColumns,
    getSelectProperties
}
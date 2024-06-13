import { MRT_ColumnDef, MRT_TableState } from "material-react-table";



export function handleExportRows<T extends Record<string, any>>(rows: T[], columns: MRT_ColumnDef<T, any>[], tableState: MRT_TableState<T>) {
    const csv = formattedData(rows, columns);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'table_data.csv';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

const formattedData = <T extends Record<string, any>>(rows: T[], columns: MRT_ColumnDef<T, any>[]) => {
    const data = rows.map(row => {
        let transformedRow: Record<string, any> = {};
        columns.forEach(column => {
            const accessorFn = column.accessorFn;
            const accessorKey = column.accessorKey;
            const key = column.header;
            transformedRow[key] = accessorFn
                ? accessorFn(row)
                : accessorKey
                    ? accessorKey.split('.').reduce((obj, keyPart) => (obj ? obj[keyPart] : ''), row.original)
                    : '';
        });
        return transformedRow;
    });

    const headers = columns.map(col => col.header);
    return [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const cell = row[header];
            return typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell;
        }).join(','))
    ].join('\n');
};

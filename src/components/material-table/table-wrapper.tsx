import {
    MaterialReactTable,
    useMaterialReactTable,
    MRT_TableOptions,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

export interface TableWrapperProps<T extends Record<string, any>> extends MRT_TableOptions<T> {
}

export function TableWrapper<T extends Record<string, any>>({ ...rest }: TableWrapperProps<T>) {

    const table = useMaterialReactTable({
        localization: MRT_Localization_ES,
        enableRowSelection: true,
        enableColumnOrdering: true,
        enableColumnResizing: true,
        enableGlobalFilter: true,
        defaultColumn: {
            maxSize: 400,
            minSize: 90,
            size: 150,
        },
        muiTableContainerProps: {
            sx: {
                minHeight: 400,
            }
        },
        ...rest
    });


    return <MaterialReactTable table={table} />;
}

export default TableWrapper
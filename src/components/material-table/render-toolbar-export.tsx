import { Box, Button, Skeleton } from "@mui/material"
import { IconWrapper } from "../icon-wrapper";
import { MRT_ColumnDef, MRT_TableInstance } from "material-react-table";
import { handleExportRows } from './helpers/export-to-csv';

type Props<T extends Record<string, any>> = {
    table: MRT_TableInstance<T>;
    isLoading: boolean;
    columns: MRT_ColumnDef<T, any>[];
}

export function RenderToolbarExport<T extends Record<string, any>>({ table, isLoading, columns }: Props<T>) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '16px',
                padding: '8px',
                flexWrap: 'wrap',
            }}
        >
            {isLoading ?
                <>
                    <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
                </>
                : <>
                    <Button
                        disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                        }
                        onClick={() => {
                            const rows = table.getSelectedRowModel().rows.map(_ => _.original)
                            handleExportRows(rows, columns, table.getState())
                        }}
                        startIcon={<IconWrapper icon="diagonalArrowDown" />}
                    >
                        Exportar filas seleccionadas
                    </Button>

                    <Button
                        disabled={table.getRowModel().rows.length === 0}
                        onClick={() => {
                            const rows = table.getRowModel().rows.map(_ => _.original)
                            handleExportRows(rows, columns, table.getState())
                        }}
                        startIcon={<IconWrapper icon="diagonalArrowDown" />}
                    >
                        Exportar Página actual
                    </Button>
                </>
            }
        </Box>
    )
}

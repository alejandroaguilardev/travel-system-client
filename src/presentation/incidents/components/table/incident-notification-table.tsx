import { FC, useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';
import { TablePagination } from '../../../../components/material-table/table-pagination';
import { COLLECTIONS } from '../../../../modules/shared/domain/collections';
import { userGlobalFilterProperties } from './incident-global-filter-properties';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { Incident } from '../../../../modules/incidents/domain/incident';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { fDateTime } from '../../../../modules/shared/infrastructure/helpers/format-time';

type Props = {
    handleSelected: (value: Incident | null) => void;
}

export const IncidentNotificationTable: FC<Props> = ({ handleSelected }) => {
    const columns = useMemo<MRT_ColumnDef<Incident>[]>(
        () => [
            {
                header: 'Nombre',
                accessorKey: 'name',
                accessorFn: (row) => row.name.toUpperCase(),
                minSize: 200
            },
            {
                header: 'Error',
                accessorKey: 'error',
                accessorFn: (row) => row.error.length > 100 ? row.error.substring(0, 100) : row.error,
                minSize: 400

            },
            {
                header: 'Fecha',
                accessorKey: 'date_error',
                accessorFn: (row) => fDateTime(row.date_error),
                minSize: 200,
                enableColumnFilter: false,
            },
        ],
        [],
    );


    return (
        <TablePagination<Incident>
            enableGlobalFilter={false}
            name={IncidentNotificationTable?.displayName || 'table'}
            collection={COLLECTIONS.incidentsNotification}
            columns={columns}
            globalFilterProperties={userGlobalFilterProperties}
            renderRowActionMenuItems={({ row }) => [
                <PermissionGuard group={AuthGroup.INCIDENTS} permission={AuthPermission.READ} key="view">
                    <RenderRowActionMenuItemButton<Incident>
                        item={{
                            name: "Visualizar",
                            icon: "eyeBold",
                        }}
                        row={row.original}
                        onSelected={(value) => {
                            handleSelected(value);
                        }}
                        key="view"
                    />
                </PermissionGuard>
            ]}
        />
    )
}

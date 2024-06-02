import { useMemo } from 'react'
import { MRT_ColumnDef } from 'material-react-table'
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract';
import { fDate, fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import Label from '../../../../../components/label/label';
import { LabelColor } from '../../../../../components/label/types';
import { Box } from '@mui/material';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { contractDetailsPetNames, dateDepartureIsLastWeek } from './contract-detail-status';

const statusPaymentRender = (contract: Contract): JSX.Element => {
    const { payInInstallments = [] } = contract;
    let completed = 0;
    let pending = 0;
    payInInstallments.forEach(_ => {
        completed += _?.isPay ? 1 : 0;
        pending += _?.isPay ? 0 : 1;
    });

    return <Box display="flex" gap={1}>
        {pending > 0 &&
            <Label color="error">{pending > 1 ? pending : ""}  Pendiente</Label>
        }
        {completed > 0 &&
            <Label color="success">{completed > 1 ? completed : ""}Completado</Label>
        }
    </Box>
}
const nextDatePayment = (payInInstallments: PayInInstallment[] = []): JSX.Element => {
    const today = fDayjs(new Date());
    let color: LabelColor = "info";

    let value: Date | null = null;
    for (const iterator of payInInstallments) {
        if (!iterator.isPay) {
            value = iterator.date;
            break;
        }
    }

    if (value) {
        color = today.isAfter(value) ? "error" : color;
    }

    return <Label color={color} >{value ? fDate(value, "DD/MM/YYYY") : "--"} </Label>
}

export const useColumnsPayment = () => {

    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'Estado',
                accessorKey: 'payInInstallments',
                Cell: ({ cell }) => statusPaymentRender(cell.row.original),
                minSize: 170,
                enableColumnFilter: false,
            },
            {
                header: 'Proximo Pago',
                accessorKey: 'payInInstallments.nextDate',
                Cell: ({ cell }) => nextDatePayment(cell.row.original?.payInInstallments),
                minSize: 170,
                enableColumnFilter: false,
            },
            {
                header: "F. E. de viaje",
                accessorKey: 'estimatedDate',
                accessorFn: (row) => fDate(row.estimatedDate, "DD/MM/YYYY"),
                minSize: 200
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
                header: 'Teléfono',
                accessorKey: 'client.profile.phone',
                minSize: 170
            },
            {
                header: 'Fecha de viaje',
                accessorKey: 'details.travel.airlineReservation.departureDate',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.travel.airlineReservation.departureDate);
                    return dateDepartureIsLastWeek(dates)
                },
                minSize: 200
            },
            {
                header: "F. E. de viaje",
                accessorKey: 'estimatedDate',
                accessorFn: (row) => dateDepartureIsLastWeek([row.estimatedDate]),
                minSize: 200
            },
            {
                header: 'Fecha de contrato',
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
                accessorFn: (row) => correlativeToString(row?.correlative),
                minSize: 170,
            },

        ],
        [],
    );

    return columns
}

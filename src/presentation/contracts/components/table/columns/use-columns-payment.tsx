import { useMemo } from 'react'
import { MRT_ColumnDef } from 'material-react-table'
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract';
import { fDate, fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import Label from '../../../../../components/label/label';
import { LabelColor } from '../../../../../components/label/types';
import { Box } from '@mui/material';
import { PayInInstallment } from '../../../../../modules/contracts/domain/payment-summary';
import { contractDetailsPetNames, dateDepartureIsLastWeek, dateDepartureIsLastWeekLabel } from './contract-detail-status';


export const useColumnsPayment = () => {

    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'N° Contracto',
                accessorKey: 'correlative',
                accessorFn: (row) => correlativeToString(row?.correlative),
                minSize: 170,
            },
            {

                header: 'Estado',
                accessorKey: 'payInInstallments',
                accessorFn: (row) => {
                    const { completed, pending } = statusPaymentRender(row);
                    let values = "";
                    if (pending > 0) {
                        values += `${pending > 1 ? pending : ""} Pendiente `;
                    }
                    if (completed > 0) {
                        values += `${completed > 1 ? completed : ""} Completado `;
                    }
                    return values;
                },
                Cell: ({ cell }) => {
                    const { completed, pending } = statusPaymentRender(cell.row.original);
                    return <Box display="flex" gap={1}>
                        {pending > 0 &&
                            <Label color="error">{pending > 1 ? pending : ""}  Pendiente</Label>
                        }
                        {completed > 0 &&
                            <Label color="success">{completed > 1 ? completed : ""}Completado</Label>
                        }
                    </Box>
                },
                minSize: 170,
                enableColumnFilter: false,
            },
            {
                header: 'Proximo Pago',
                accessorKey: 'payInInstallments.nextDate',
                accessorFn: (row) => {
                    const { value } = nextDatePayment(row?.payInInstallments);
                    return value ? fDate(value, "DD/MM/YYYY") : "--";
                },
                Cell: ({ cell }) => {
                    const { color, value } = nextDatePayment(cell.row.original?.payInInstallments);
                    return <Label color={color} >{value ? fDate(value, "DD/MM/YYYY") : "--"} </Label>
                },
                minSize: 170,
                enableColumnFilter: false,
            },
            {
                header: "F. E. de viaje",
                accessorKey: 'estimatedDate',
                accessorFn: (row) => row?.estimatedDate ? fDate(row.estimatedDate, 'DD/MM/YYYY') : "",
                Cell: ({ cell }) => {
                    const dates = dateDepartureIsLastWeek([cell.row.original.estimatedDate]);
                    return dateDepartureIsLastWeekLabel(dates);
                },
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
                accessorFn: (row) => row?.client?.profile?.documentNumber ?? "",
                accessorKey: 'client.profile.documentNumber',
                minSize: 170
            },
            {
                header: 'Nombre',
                accessorFn: (row) => row?.client?.profile?.name ?? "",
                accessorKey: 'client.profile.name',
                minSize: 170
            },
            {
                header: 'Apellido',
                accessorFn: (row) => row?.client?.profile?.lastName ?? "",
                accessorKey: 'client.profile.lastName',
                minSize: 170
            },
            {
                header: 'Teléfono',
                accessorFn: (row) => row?.client?.profile?.phone ?? "",
                accessorKey: 'client.profile.phone',
                minSize: 170
            },
            {
                header: 'Fecha de viaje',
                filterVariant: "date",
                accessorKey: 'details.travel.airlineReservation.departureDate',
                accessorFn: (row) => row.details.map(_ => _.travel?.airlineReservation?.departureDate
                    ? fDate(_.travel.airlineReservation.departureDate, 'DD/MM/YYYY')
                    : ""
                ),
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.travel.airlineReservation.departureDate);
                    const values = dateDepartureIsLastWeek(dates);
                    return dateDepartureIsLastWeekLabel(values);
                },
                minSize: 200
            },
            {
                header: 'Fecha de contrato',
                filterVariant: "date",
                accessorKey: 'startDate',
                accessorFn: (row) => fDate(row.startDate, 'DD/MM/YYYY HH:mm:ss'),
                minSize: 200
            },
            {
                header: 'Fecha de Finalización',
                accessorKey: 'endDate',
                filterVariant: "date",
                accessorFn: (row) => row.endDate ? fDate(row.endDate, 'DD/MM/YYYY HH:mm:ss') : "--",
                minSize: 200
            },
            {
                header: 'Folio',
                accessorKey: 'folder',
                accessorFn: (row) => row?.folder ?? "",
                minSize: 170,
            },
            {
                header: 'F.Número',
                accessorKey: 'number',
                accessorFn: (row) => row?.number ?? "",
                minSize: 170,
            },
        ],
        [],
    );

    return columns
}


const statusPaymentRender = (contract: Contract): { completed: number, pending: number } => {
    const { payInInstallments = [] } = contract;
    let completed = 0;
    let pending = 0;
    payInInstallments.forEach(_ => {
        completed += _?.isPay ? 1 : 0;
        pending += _?.isPay ? 0 : 1;
    });

    return { completed, pending };
}
const nextDatePayment = (payInInstallments: PayInInstallment[] = []): { color: LabelColor, value: Date | null } => {
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
    return { color, value }
}



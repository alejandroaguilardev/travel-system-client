import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract';
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { contractDetailStatus, contractDetailsPetNames, dateDepartureIsLastWeek, dateDepartureIsLastWeekLabel, valuesLabel } from './contract-detail-status';


export const useColumnsTravel = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [

            {
                header: 'Fecha de viaje',
                accessorKey: 'details.travel.airlineReservation.departureDate',
                accessorFn: ({ details }) => {
                    const dates = details?.map(_ => fDate(_.documentation.senasaDocuments.executionDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.travel.airlineReservation.departureDate);
                    const values = dateDepartureIsLastWeek(dates);
                    return dateDepartureIsLastWeekLabel(values);
                },
                minSize: 200
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
                header: 'Estado',
                accessorKey: 'details.travel.status',
                accessorFn: ({ details }) => contractDetailsPetNames(details),
                Cell: ({ cell }) => {
                    const { completed, pending } = contractDetailStatus(cell.row.original.details, "travel");
                    return valuesLabel({ completed, pending });
                },
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 200,
            },

            {
                header: 'Nombre',
                accessorKey: 'client.profile.name',
                accessorFn: ({ client }) => client?.profile?.name ?? "",
                minSize: 170
            },
            {
                header: 'Apellido',
                accessorKey: 'client.profile.lastName',
                accessorFn: ({ client }) => client?.profile?.lastName ?? "",
                minSize: 170
            },
            {
                header: 'Teléfono',
                accessorKey: 'client.profile.phone',
                accessorFn: ({ client }) => client?.profile?.phone ?? "",
                minSize: 170
            },
            {
                header: 'Fecha de contrato',
                accessorKey: 'startDate',
                accessorFn: (row) => fDate(row.startDate, 'DD/MM/YYYY'),
                minSize: 150
            },
            {
                header: 'País de destino',
                accessorKey: 'details.travel.destination.countryDestination',
                accessorFn: ({ details }) => {
                    const countries = details.map(_ => _.travel.destination.countryDestination);
                    return countries.join(", ")
                },
                Cell: ({ cell }) => {
                    const countries = cell.row.original.details.map(_ => _.travel.destination.countryDestination);
                    return countries.join(", ")
                },
                minSize: 170
            },
            {
                header: 'Asesor',
                accessorFn: ({ adviser }) => adviser?.profile?.phone ?? "",
                accessorKey: 'adviser.profile.name',
                minSize: 200,
            },
            {
                header: 'Fecha de reserva',
                accessorKey: 'details.travel.airlineReservation.departureDate',
                accessorFn: ({ details }) => {
                    const dates = details.map(_ => fDate(_.travel.airlineReservation.departureDate, 'DD/MM/YYYY'));
                    return dates.join(", ");
                },
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.travel.airlineReservation.departureDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
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

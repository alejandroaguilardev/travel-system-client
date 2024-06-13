import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { contractDetailStatus, contractDetailsPetNames, dateDepartureIsLastWeek, dateDepartureIsLastWeekLabel, valuesLabel, valuesStatus } from './contract-detail-status';


export const useColumnsCage = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'Mascota',
                accessorKey: 'details.profile.lastName',
                accessorFn: ({ details }) => contractDetailsPetNames(details),
                minSize: 170,
                enableColumnFilter: false,
            },
            {
                header: 'Fecha de viaje',
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
                header: "F. E. de viaje",
                accessorKey: 'estimatedDate',
                accessorFn: (row) => row?.estimatedDate ? fDate(row.estimatedDate, 'DD/MM/YYYY') : "",
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.travel.airlineReservation.departureDate);
                    const values = dateDepartureIsLastWeek(dates);
                    return dateDepartureIsLastWeekLabel(values);
                },
                minSize: 200
            },
            {
                header: 'Tipo',
                accessorKey: 'details.cage.chosen.typeCage',
                accessorFn: (row) => {
                    const chosen = row.details.map(_ => _.cage.chosen.typeCage);
                    return chosen.join(", ")
                },
                Cell: ({ cell }) => {
                    const chosen = cell.row.original.details.map(_ => _.cage.chosen.typeCage);
                    return chosen.join(", ")
                },
                minSize: 200
            },
            {
                header: 'Modelo',
                accessorKey: 'details.cage.chosen.modelCage',
                accessorFn: (row) => {
                    const chosen = row.details.map(_ => _.cage.chosen.typeCage);
                    return chosen.join(", ")
                },
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.cage.chosen.modelCage);
                    return dates.join(", ");
                },
                minSize: 200
            },
            {
                header: 'Dimensión',
                accessorKey: 'details.cage.chosen.dimensionsCage',
                accessorFn: (row) => {
                    const chosen = row.details.map(_ => _.cage.chosen.dimensionsCage);
                    return chosen.join(", ")
                },
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.cage.chosen.dimensionsCage);
                    return dates.join(", ")
                },
                minSize: 200
            },

            {
                header: 'Estado',
                accessorKey: 'details.cage.status',
                accessorFn: (row) => {
                    const { completed, pending } = contractDetailStatus(row.details, "cage");
                    return valuesStatus({ completed, pending });
                },
                Cell: ({ cell }) => {
                    const { completed, pending } = contractDetailStatus(cell.row.original.details, "cage");
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
                accessorFn: (row) => row?.client?.profile?.name ? row?.client?.profile?.name : "",
                accessorKey: 'client.profile.name',
                minSize: 170
            },
            {
                header: 'Apellido',
                accessorFn: (row) => row?.client?.profile?.lastName ? row?.client?.profile?.lastName : "",
                accessorKey: 'client.profile.lastName',
                minSize: 170
            },
            {
                header: 'Teléfono',
                accessorFn: (row) => row?.client?.profile?.phone ? row?.client?.profile?.phone : "",
                accessorKey: 'client.profile.phone',
                minSize: 170
            },
            {
                header: 'País de destino',
                accessorFn: (row) => {
                    const countries = row.details.map(_ => _.travel.destination.countryDestination);
                    return countries.join(", ")
                },
                accessorKey: 'details.travel.destination.countryDestination',
                Cell: ({ cell }) => {
                    const countries = cell.row.original.details.map(_ => _.travel.destination.countryDestination);
                    return countries.join(", ")
                },
                minSize: 170
            },
            {
                header: 'Asesor',
                accessorFn: (row) => row?.adviser?.profile?.name ? row?.adviser?.profile?.name : "",
                accessorKey: 'adviser.profile.name',
                minSize: 200,
            },
            {
                header: 'Folio',
                accessorFn: (row) => row?.folder ? row?.folder : "",
                accessorKey: 'folder',
                minSize: 170,
            },
            {
                header: 'F.Número',
                accessorFn: (row) => row?.number ? row?.number : "",
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

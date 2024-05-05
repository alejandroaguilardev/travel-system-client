import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { contractDetailStatus, contractDetailsPetNames, dateDepartureIsLastWeek } from './contract-detail-status';


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
                header: 'Tipo',
                accessorKey: 'details.cage.chosen.typeCage',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.cage.chosen.typeCage);
                    return dates.join(", ")
                },
                minSize: 200
            },
            {
                header: 'Modelo',
                accessorKey: 'details.cage.chosen.modelCage',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.cage.chosen.modelCage);
                    return dates.join(", ")
                },
                minSize: 200
            },
            {
                header: 'Dimensión',
                accessorKey: 'details.cage.chosen.dimensionsCage',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => _.cage.chosen.dimensionsCage);
                    return dates.join(", ")
                },
                minSize: 200
            },

            {
                header: 'Estado',
                accessorKey: 'details.cage.status',
                Cell: ({ cell }) => contractDetailStatus(cell.row.original.details, "cage"),
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
                header: 'País de destino',
                accessorKey: 'details.travel.destination.countryDestination',
                Cell: ({ cell }) => {
                    const countries = cell.row.original.details.map(_ => _.travel.destination.countryDestination);
                    return countries.join(", ")
                },
                minSize: 170
            },
            {
                header: 'Asesor',
                accessorKey: 'adviser.profile.name',
                minSize: 200,
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

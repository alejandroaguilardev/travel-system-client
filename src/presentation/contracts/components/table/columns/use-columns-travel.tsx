import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import { Contract } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { contractDetailStatus, contractDetailsPetNames } from './contract-detail-status';


export const useColumnsTravel = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'Estado',
                accessorKey: 'details.travel.status',
                Cell: ({ cell }) => contractDetailStatus(cell.row.original.details, "travel"),
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 200,
            },
            {
                header: 'Fecha',
                accessorKey: 'startDate',
                accessorFn: (row) => fDate(row.startDate, 'DD/MM/YYYY'),
                minSize: 150
            },
            {
                header: 'Mascota',
                accessorKey: 'details.profile.lastName',
                accessorFn: ({ details }) => contractDetailsPetNames(details),
                minSize: 170,
                enableColumnFilter: false,
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
                header: 'Nombre de la Mascota',
                accessorKey: 'details.documentation.chipCertificate.isApplied',
                Cell: ({ cell }) => {
                    const pets = cell.row.original.details.map(_ => _.pet?.name);
                    return pets.join(", ")
                },
                minSize: 200,
            },
            {
                header: 'Asesor',
                accessorKey: 'adviser.profile.name',
                minSize: 200,
            },
            {
                header: 'Fecha de reserva',
                accessorKey: 'details.travel.airlineReservation.departureDate',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.travel.airlineReservation.departureDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                minSize: 200
            },
        ],
        [],
    );

    return columns
}

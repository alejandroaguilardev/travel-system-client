import { useMemo } from 'react'
import { MRT_ColumnDef } from 'material-react-table'
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import Label from '../../../../../components/label';


export const useColumnsFolders = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'N° Contracto',
                accessorKey: 'correlative',
                accessorFn: (row) => correlativeToString(row?.correlative),
                minSize: 170,
            },
            {
                header: 'Fecha de Inicio',
                accessorKey: 'startDate',
                filterVariant: "date",
                accessorFn: (row) => fDate(row.startDate, 'DD/MM/YYYY HH:mm:ss'),
                minSize: 200
            },

            {
                header: 'Folio',
                accessorFn: (row) => row?.folder ? row?.folder : "",
                accessorKey: 'folder',
                minSize: 170,
            },
            {
                header: 'F.Número',
                Cell: ({ cell }) => {
                    const { number } = cell.row.original;
                    return <Label color={number ? "success" : "error"}>{number || "Sin folder"}</Label>
                },
                accessorKey: 'number',
                minSize: 170,
            },

            {
                header: 'Asesor',
                accessorFn: (row) => row?.adviser?.profile?.name ? row?.adviser?.profile?.name : "",
                accessorKey: 'adviser.profile.name',
                minSize: 200,
            },
            {
                header: 'Nombre',
                accessorFn: (row) => row?.client?.profile?.name ? row?.client?.profile?.name : "",
                accessorKey: 'client.profile.name',
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



        ],
        [],
    );

    return columns
}

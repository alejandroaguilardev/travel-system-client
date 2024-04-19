import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import Label from '../../../../../components/label';
import { Contract } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { contractDetailsPetNames } from './contract-detail-status';


const detailsStatus = (details: ContractDetail[], value: keyof typeof DOCUMENTATION_KEYS): JSX.Element => {
    let pending = details?.length ?? 0;
    let completed = 0;
    details.forEach(_ => {
        completed += _.documentation?.[value]?.isApplied ? 1 : 0;
    })

    pending -= completed;
    return <>
        {pending > 0 &&
            <Label color="error">{pending > 1 ? pending : ""} Pendiente</Label>
        }
        {completed > 0 &&
            <Label color="success">{pending > 1 ? pending : ""}Completado</Label>
        }
    </>
}

export const useColumnsSenasa = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'Estado',
                accessorKey: 'details.documentation.senasaDocuments.isApplied',
                Cell: ({ cell }) => detailsStatus(cell.row.original.details, "senasaDocuments"),
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
                header: 'Fecha de viaje',
                accessorKey: 'details.travel.airlineReservation.departureDate',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.travel.airlineReservation.departureDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                minSize: 200
            },
            {
                header: 'Presentar en senasa',
                accessorKey: 'details.documentation.senasaDocuments.executionDate',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.documentation.senasaDocuments.executionDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                minSize: 200
            },
            {
                header: 'Fecha de resultado',
                accessorKey: 'details.documentation.senasaDocuments.resultDate',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.documentation.senasaDocuments.resultDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                minSize: 200
            },


        ],
        [],
    );

    return columns
}

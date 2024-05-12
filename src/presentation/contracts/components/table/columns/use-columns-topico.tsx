import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import Label from '../../../../../components/label';
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { TOPICO_KEYS } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractDetailsPetNames, dateDepartureIsLastWeek } from './contract-detail-status';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';


const detailsTopicoStatus = (details: ContractDetail[], value: keyof typeof TOPICO_KEYS, documentation: keyof typeof DOCUMENTATION_KEYS): JSX.Element => {
    let pending = 0;
    let notIncluded = 0;
    let completed = 0;

    for (const _ of details) {
        if (!_.documentation?.[documentation]?.hasServiceIncluded) {
            notIncluded += 1;
            continue;
        }
        if (_.documentation?.[documentation]?.hasServiceIncluded) {
            pending += 1;
            continue;
        }
        completed += 1;
    }

    pending -= completed;
    return <>
        {notIncluded > 0 &&
            <Label color="default">{notIncluded > 1 ? notIncluded : ""} No Incluido</Label>
        }
        {pending > 0 &&
            <Label color="error">{pending > 1 ? pending : ""} Pendiente</Label>
        }
        {completed > 0 &&
            <Label color="success">{completed > 1 ? completed : ""}Completado</Label>
        }
    </>
}

export const useColumnsTopico = () => {
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
                header: 'Microchip',
                accessorKey: 'details.topico.chip.executed',
                Cell: ({ cell }) => detailsTopicoStatus(cell.row.original.details, "chip", "chipCertificate"),
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 200,
            },
            {
                header: 'Vacuna',
                accessorKey: 'details.topico.vaccination.executed',
                Cell: ({ cell }) => detailsTopicoStatus(cell.row.original.details, "vaccination", "vaccinationCertificate"),
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 200,
            },
            {
                header: 'Vac. de rabia',
                accessorKey: 'details.topico.rabiesVaccination.executed',
                Cell: ({ cell }) => detailsTopicoStatus(cell.row.original.details, "rabiesVaccination", "rabiesSeroLogicalTest"),
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 200,
            },
            {
                header: 'ReVac. de Rabia',
                accessorKey: 'details.topico.rabiesReVaccination.executed',
                Cell: ({ cell }) => detailsTopicoStatus(cell.row.original.details, "rabiesReVaccination", "rabiesSeroLogicalTest"),
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 220,
            },
            {
                header: 'Rev. Microchip',
                accessorKey: 'details.topico.chipReview.executed',
                Cell: ({ cell }) => detailsTopicoStatus(cell.row.original.details, "chipReview", "rabiesSeroLogicalTest"),
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 220,
            },
            {
                header: 'Toma de muestra',
                accessorKey: 'details.topico.takingSampleSerologicalTest.executed',
                Cell: ({ cell }) => detailsTopicoStatus(cell.row.original.details, "takingSampleSerologicalTest", "rabiesSeroLogicalTest"),
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 230,
            },
            {
                header: 'Fecha de Inicio',
                accessorKey: 'startDate',
                accessorFn: (row) => fDate(row.startDate, 'DD/MM/YYYY HH:mm:ss'),
                minSize: 220
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

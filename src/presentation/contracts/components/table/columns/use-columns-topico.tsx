import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import Label from '../../../../../components/label';
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { TOPICO_KEYS } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractDetailsPetNames, dateDepartureIsLastWeek, dateDepartureIsLastWeekLabel } from './contract-detail-status';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';

export const useColumnsTopico = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'N° Documento',
                accessorKey: 'client.profile.documentNumber',
                accessorFn: ({ client }) => client?.profile?.documentNumber ?? "",
                minSize: 170
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
                    const values = dateDepartureIsLastWeek(dates);
                    return dateDepartureIsLastWeekLabel(values);
                },
                minSize: 200
            },
            {
                header: "F. E. de viaje",
                accessorKey: 'estimatedDate',
                accessorFn: (row) => row?.estimatedDate ? fDate(row.estimatedDate, 'DD/MM/YYYY') : "--",
                Cell: ({ cell }) => {
                    const dates = dateDepartureIsLastWeek([cell.row.original.estimatedDate]);
                    return dateDepartureIsLastWeekLabel(dates);
                },
                minSize: 200
            },

            {
                header: 'Microchip',
                accessorKey: 'details.topico.chip.executed',
                accessorFn: ({ details }) => {
                    const values = detailsTopicoStatus(details, "chip");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "chip");
                    return detailsTopicoStatusLabel(values);
                },
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
                accessorFn: ({ details }) => {
                    const values = detailsTopicoStatus(details, 'vaccination');
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, 'vaccination');
                    return detailsTopicoStatusLabel(values);
                },
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
                accessorFn: ({ details }) => {
                    const values = detailsTopicoStatus(details, "rabiesVaccination");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "rabiesVaccination");
                    return detailsTopicoStatusLabel(values);
                },
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
                accessorFn: ({ details }) => {
                    const values = detailsTopicoStatus(details, "rabiesReVaccination");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "rabiesReVaccination");
                    return detailsTopicoStatusLabel(values);
                },
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
                accessorFn: ({ details }) => {
                    const values = detailsTopicoStatus(details, "chipReview");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "chipReview");
                    return detailsTopicoStatusLabel(values);
                },
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
                accessorFn: ({ details }) => {
                    const values = detailsTopicoStatus(details, "takingSampleSerologicalTest");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "takingSampleSerologicalTest");
                    return detailsTopicoStatusLabel(values);
                },
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


type DetailsTopicoStatus = {
    pending: number,
    notIncluded: number,
    optional: number,
    completed: number
}


const detailsTopicoStatus = (details: ContractDetail[], topico: keyof typeof TOPICO_KEYS): DetailsTopicoStatus => {
    let pending = 0;
    let optional = 0;
    let notIncluded = 0;
    let completed = 0;

    for (const _ of details) {
        if (!_.topico?.[topico]?.executed && topico === "chipReview") {
            optional += 1;
            continue;
        }


        if (!_.topico?.[topico]?.hasIncluded || !_.topico?.[topico]?.executed) {
            notIncluded += 1;
            continue;
        }

        if (_.topico?.[topico]?.executed) {
            pending += 1;
            continue;
        }
        if (topico !== "chipReview") {
            completed += 1;
        }
    }

    pending -= completed;
    return { pending, notIncluded, optional, completed };
}


const detailsTopicoStatusLabel = ({ completed, notIncluded, pending, optional }: DetailsTopicoStatus): JSX.Element => {
    return <>
        {notIncluded > 0 &&
            <Label color="default">{notIncluded > 1 ? notIncluded : ""} No Incluido</Label>
        }
        {pending > 0 &&
            <Label color="error">{pending > 1 ? pending : ""} Pendiente</Label>
        }
        {optional > 0 &&
            <Label color="default">{optional > 1 ? optional : ""} Opcional</Label>
        }
        {completed > 0 &&
            <Label color="success">{completed > 1 ? completed : ""}Completado</Label>
        }
    </>
}
const detailsTopicoStatusValues = ({ completed, notIncluded, pending }: DetailsTopicoStatus): string => {
    let values = "";
    if (notIncluded > 0) {
        values += `${notIncluded > 1 ? notIncluded : ""} No Incluido`;
    }
    if (pending > 0) {
        values += `${pending > 1 ? pending : ""} Pendiente`;
    }
    if (completed > 0) {
        values += `${completed > 1 ? completed : ""} Completado`;
    }
    return values;
}

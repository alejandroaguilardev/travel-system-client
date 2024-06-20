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
                    const values = detailsTopicoStatus(details, "chip", "chipCertificate");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "chip", "chipCertificate");
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
                    const values = detailsTopicoStatus(details, 'vaccination', "vaccinationCertificate");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, 'vaccination', "vaccinationCertificate");
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
                    const values = detailsTopicoStatus(details, "rabiesVaccination", "rabiesSeroLogicalTest");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "rabiesVaccination", "rabiesSeroLogicalTest");
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
                    const values = detailsTopicoStatus(details, "rabiesReVaccination", "rabiesSeroLogicalTest");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "rabiesReVaccination", "rabiesSeroLogicalTest");
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
                    const values = detailsTopicoStatus(details, "chipReview", "rabiesSeroLogicalTest");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "chipReview", "rabiesSeroLogicalTest");
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
                    const values = detailsTopicoStatus(details, "takingSampleSerologicalTest", "rabiesSeroLogicalTest");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsTopicoStatus(cell.row.original.details, "takingSampleSerologicalTest", "rabiesSeroLogicalTest");
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
    completed: number
}


const detailsTopicoStatus = (details: ContractDetail[], value: keyof typeof TOPICO_KEYS, documentation: keyof typeof DOCUMENTATION_KEYS): DetailsTopicoStatus => {
    let pending = 0;
    let notIncluded = 0;
    let completed = 0;

    for (const _ of details) {
        if (!_.documentation?.[documentation]?.hasServiceIncluded) {
            notIncluded += 1;
            continue;
        }
        if (_.documentation?.[documentation]?.hasServiceIncluded && !_.topico?.[value]?.executed) {
            pending += 1;
            continue;
        }
        completed += 1;
    }

    pending -= completed;
    return { pending, notIncluded, completed };
}


const detailsTopicoStatusLabel = ({ completed, notIncluded, pending }: DetailsTopicoStatus): JSX.Element => {
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

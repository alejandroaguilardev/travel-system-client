import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import Label from '../../../../../components/label';
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { TOPICO_KEYS } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractDetailsPetNames, dateDepartureIsLastWeek, dateDepartureIsLastWeekLabel } from './contract-detail-status';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { CONSTANTS } from '../../../../../app/config/constants';

export const useColumnsTopico = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'N° Contracto',
                accessorKey: 'correlative',
                accessorFn: (row) => correlativeToString(row?.correlative),
                minSize: 170,
            },
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
                filterVariant: "date",
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
                filterVariant: "date",
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
                accessorFn: (row) => {
                    const values = detailsStatus(row, "chip", "chipCertificate");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original, "chip", "chipCertificate");
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
                accessorFn: (row) => {
                    const values = detailsStatus(row, 'vaccination', "vaccinationCertificate");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original, 'vaccination', "vaccinationCertificate");
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
                accessorFn: (row) => {
                    const values = detailsStatus(row, "rabiesVaccination", "rabiesSeroLogicalTest");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original, "rabiesVaccination", "rabiesSeroLogicalTest");
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
                accessorFn: (row) => {
                    const values = detailsStatus(row, "rabiesReVaccination", "rabiesSeroLogicalTest");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original, "rabiesReVaccination", "rabiesSeroLogicalTest");
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
                accessorFn: (row) => {
                    const values = detailsStatus(row, "chipReview", "chipCertificate");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original, "chipReview", "chipCertificate");
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
                accessorFn: (row) => {
                    const values = detailsStatus(row, "takingSampleSerologicalTest", "rabiesSeroLogicalTest");
                    return detailsTopicoStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original, "takingSampleSerologicalTest", "rabiesSeroLogicalTest");
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


const detailsStatus = (contract: Contract, topico: keyof typeof TOPICO_KEYS, documentation: keyof typeof DOCUMENTATION_KEYS): DetailsTopicoStatus => {
    if (CONSTANTS.TOPICO_UPDATE_CUT_OFF_DATE.getTime() > new Date(contract.startDate).getTime()) {
        return detailsTopicoDocumentationStatus(contract.details, topico, documentation);
    }
    return detailsTopicoStatus(contract.details, topico);


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



const detailsTopicoStatus = (details: ContractDetail[], topico: keyof typeof TOPICO_KEYS): DetailsTopicoStatus => {
    let pending = 0;
    let optional = 0;
    let notIncluded = 0;
    let completed = 0;

    for (const _ of details) {
        if (_.topico?.[topico]?.hasIncluded && !_.topico?.[topico]?.executed && topico === "chipReview") {
            optional += 1;
            continue;
        }


        if (!_.topico?.[topico]?.hasIncluded) {
            notIncluded += 1;
            continue;
        }

        if (_.topico?.[topico]?.hasIncluded && !_.topico?.[topico]?.executed) {
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



const detailsTopicoDocumentationStatus = (details: ContractDetail[], value: keyof typeof TOPICO_KEYS, documentation: keyof typeof DOCUMENTATION_KEYS): DetailsTopicoStatus => {
    let pending = 0;
    let optional = 0;
    let notIncluded = 0;
    let completed = 0;

    for (const _ of details) {
        if (_.documentation?.[documentation]?.hasServiceIncluded && !_.topico?.[value]?.executed && value === "rabiesReVaccination") {
            optional += 1;
            continue;
        }


        if (!_.documentation?.[documentation]?.hasServiceIncluded) {
            notIncluded += 1;
            continue;
        }

        if (_.documentation?.[documentation]?.hasServiceIncluded && !_.topico?.[value]?.executed) {
            pending += 1;
            continue;
        }
        if (value !== "rabiesReVaccination") {
            completed += 1;
        }
    }

    pending -= completed;
    return { pending, notIncluded, optional, completed };
}

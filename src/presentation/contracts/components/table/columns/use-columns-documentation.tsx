import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import Label from '../../../../../components/label';
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { contractDetailsPetNames, dateDepartureIsLastWeek, dateDepartureIsLastWeekLabel } from './contract-detail-status';


export const useColumnsDocumentation = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'N° Contracto',
                accessorKey: 'correlative',
                accessorFn: (row) => correlativeToString(row?.correlative),
                minSize: 170,
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
                header: 'N° Documento',
                accessorFn: (row) => row?.client?.profile?.documentNumber ?? "",
                accessorKey: 'client.profile.documentNumber',
                minSize: 170
            },
            {
                header: 'Nombre',
                accessorFn: (row) => row?.client?.profile?.name ?? "",
                accessorKey: 'client.profile.name',
                minSize: 170
            },
            {
                header: 'Apellido',
                accessorFn: (row) => row?.client?.profile?.lastName ?? "",
                accessorKey: 'client.profile.lastName',
                minSize: 170
            },
            {
                header: 'C. Microchip',
                accessorKey: 'details.documentation.chipCertificate.isApplied',
                accessorFn: (row) => {
                    const values = detailsStatus(row.details, "chipCertificate");
                    return detailsStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original.details, "chipCertificate");
                    return detailsStatusLabel(values);
                },
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 200,
            },
            {
                header: 'C. Vacunación',
                accessorKey: 'details.documentation.vaccinationCertificate.isApplied',
                accessorFn: (row) => {
                    const values = detailsStatus(row.details, "vaccinationCertificate");
                    return detailsStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original.details, "vaccinationCertificate");
                    return detailsStatusLabel(values);
                },
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 210,
            },
            {
                header: 'P. de importación',
                accessorKey: 'details.documentation.importLicense.executed',
                accessorFn: (row) => {
                    const values = detailsStatus(row.details, "importLicense");
                    return detailsStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original.details, "importLicense");
                    return detailsStatusLabel(values);
                },
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 230,
            },
            {
                header: 'Cert. de salud',
                accessorKey: 'details.documentation.healthCertificate.executed',
                accessorFn: (row) => {
                    const values = detailsStatus(row.details, "healthCertificate");
                    return detailsStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original.details, "healthCertificate");
                    return detailsStatusLabel(values);
                },
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 210,
            },
            {
                header: 'Cert. soporte emocional',
                accessorKey: 'details.documentation.emotionalSupportCertificate.executed',
                accessorFn: (row) => {
                    const values = detailsStatus(row.details, "emotionalSupportCertificate");
                    return detailsStatusValues(values);
                },
                Cell: ({ cell }) => {
                    const values = detailsStatus(cell.row.original.details, "emotionalSupportCertificate");
                    return detailsStatusLabel(values);
                },
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 300,
            },
            {
                header: 'Fecha de contrato',
                accessorKey: 'startDate',
                accessorFn: (row) => fDate(row.startDate, 'DD/MM/YYYY'),
                minSize: 150
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


type DetailsStatus = {
    hasIncluded: number;
    notIncluded: number;
    optional: number;
    completed: number;
}

const detailsStatusLabel = ({ completed, hasIncluded, notIncluded, optional }: DetailsStatus): JSX.Element => {

    return <>
        {hasIncluded > 0 &&
            <Label color="error">{hasIncluded > 1 ? hasIncluded : ""} Requerido</Label>
        }
        {notIncluded > 0 &&
            <Label color="default">{notIncluded > 1 ? notIncluded : ""} No Incluido</Label>
        }
        {optional > 0 &&
            <Label color="info">{optional > 1 ? optional : ""} Opcional</Label>
        }
        {completed > 0 &&
            <Label color="success">{completed > 1 ? completed : ""}Completado</Label>
        }
    </>
}
const detailsStatusValues = ({ completed, hasIncluded, notIncluded, optional }: DetailsStatus): string => {
    let values = "";
    if (hasIncluded > 0) {
        values += `${hasIncluded > 1 ? hasIncluded : ""} Requerido`;
    }

    if (notIncluded > 0) {
        values += `${notIncluded > 1 ? notIncluded : ""} No Incluido`;
    }

    if (optional > 0) {
        values += `${optional > 1 ? optional : ""} Opcional`;
    }

    if (completed > 0) {
        values += `${completed > 1 ? completed : ""} Completado`;
    }

    return values;
}

const detailsStatus = (details: ContractDetail[], value: keyof typeof DOCUMENTATION_KEYS): DetailsStatus => {
    let hasIncluded = 0;
    let notIncluded = 0;
    let optional = 0;
    let completed = 0;
    for (const _ of details) {
        if (_.documentation?.[value]?.isApplied) {
            completed += 1;
            continue;
        }
        if (_.documentation?.[value]?.hasServiceIncluded) {
            hasIncluded += 1;
            continue;
        }
        if (!_.documentation?.[value]?.hasServiceIncluded) {
            notIncluded += 1;
            continue;
        }
        optional += 1
    }
    return { hasIncluded, notIncluded, optional, completed }
}

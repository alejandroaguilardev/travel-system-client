import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import Label from '../../../../../components/label';
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { contractDetailsPetNames, dateDepartureIsLastWeek } from './contract-detail-status';


const detailsStatus = (details: ContractDetail[], value: keyof typeof DOCUMENTATION_KEYS): JSX.Element => {
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

export const useColumnsDocumentation = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
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
                header: 'Mascota',
                accessorKey: 'details.profile.lastName',
                accessorFn: ({ details }) => contractDetailsPetNames(details),
                minSize: 170,
                enableColumnFilter: false,
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
                header: 'C. Microchip',
                accessorKey: 'details.documentation.chipCertificate.isApplied',
                Cell: ({ cell }) => detailsStatus(cell.row.original.details, "chipCertificate"),
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
                Cell: ({ cell }) => detailsStatus(cell.row.original.details, "vaccinationCertificate"),
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
                Cell: ({ cell }) => detailsStatus(cell.row.original.details, "importLicense"),
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
                Cell: ({ cell }) => detailsStatus(cell.row.original.details, "healthCertificate"),
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
                Cell: ({ cell }) => detailsStatus(cell.row.original.details, "emotionalSupportCertificate"),
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

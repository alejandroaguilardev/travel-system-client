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

export const useColumnsDocumentation = () => {
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
                header: 'Fecha de Inicio',
                accessorKey: 'startDate',
                accessorFn: (row) => fDate(row.startDate, 'DD/MM/YYYY HH:mm:ss'),
                minSize: 210
            },
            {
                header: 'Folio',
                accessorKey: 'folder',
                minSize: 170,
            },
            {
                header: 'Número',
                accessorKey: 'number',
                minSize: 170,
            },

        ],
        [],
    );

    return columns
}

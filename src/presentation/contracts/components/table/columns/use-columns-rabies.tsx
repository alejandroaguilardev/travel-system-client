import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import Label, { LabelColor } from '../../../../../components/label';
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

export const useColumnsRabies = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'Estado',
                accessorKey: 'details.documentation.rabiesSeroLogicalTest.isApplied',
                Cell: ({ cell }) => detailsStatus(cell.row.original.details, "rabiesSeroLogicalTest"),
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
                header: 'Fecha de T.M',
                accessorKey: 'details.topico.takingSampleSerologicalTest.date',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.travel.airlineReservation.departureDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                minSize: 250
            },
            {
                header: 'Tipo de Muestra',
                accessorKey: 'details.topico.takingSampleSerologicalTest.typeSample',
                Cell: ({ cell }) => {

                    return cell.row.original.details.map(_ => {
                        const type = _.topico?.takingSampleSerologicalTest?.typeSample;
                        let color: LabelColor = "default";
                        if (type === "PR") color = "info";
                        if (type === "AYU") color = "warning";
                        return <Label color={color} width="100%">{type}
                        </Label>
                    });
                },
                minSize: 180
            },
            {
                header: 'Fecha del resultado',
                accessorKey: 'details.documentation.rabiesSeroLogicalTest.resultDate',
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.documentation.rabiesSeroLogicalTest.resultDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                minSize: 250
            },


        ],
        [],
    );

    return columns
}

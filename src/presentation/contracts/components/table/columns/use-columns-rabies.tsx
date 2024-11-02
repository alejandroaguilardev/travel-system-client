import { MRT_ColumnDef } from 'material-react-table'
import { useMemo } from 'react'
import Label, { LabelColor } from '../../../../../components/label';
import { Contract, correlativeToString } from '../../../../../modules/contracts/domain/contract'
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { contractDetailsPetNames, dateDepartureIsLastWeek, dateDepartureIsLastWeekLabel, detailsStatus } from './contract-detail-status';


export const useColumnsRabies = () => {
    const columns = useMemo<MRT_ColumnDef<Contract>[]>(
        () => [
            {
                header: 'N° Contracto',
                accessorKey: 'correlative',
                accessorFn: (row) => correlativeToString(row?.correlative),
                minSize: 170,
            },
            {
                header: 'Estado',
                accessorKey: 'details.documentation.rabiesSeroLogicalTest.isApplied',
                accessorFn: (row) => {
                    const { completed, pending } = detailsStatus(row.details, "rabiesSeroLogicalTest");
                    let values = "";
                    if (pending > 0) {
                        values += `${pending > 1 ? pending : ""} Pendiente`;
                    }
                    if (completed > 0) {
                        values += `${completed > 1 ? completed : ""} Completado`;
                    }
                },
                Cell: ({ cell }) => {
                    const { completed, pending } = detailsStatus(cell.row.original.details, "rabiesSeroLogicalTest");
                    return <>
                        {pending > 0 &&
                            <Label color="error">{pending > 1 ? pending : ""} Pendiente</Label>
                        }
                        {completed > 0 &&
                            <Label color="success">{pending > 1 ? pending : ""}Completado</Label>
                        }
                    </>
                },
                filterVariant: "select",
                filterSelectOptions: [
                    { text: "Completado", value: true },
                    { text: "Todos", value: false }
                ],
                minSize: 200,
            },
            {
                header: 'Fecha de viaje',
                filterVariant: "date",
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
                header: 'Teléfono',
                accessorKey: 'client.profile.phone',
                accessorFn: ({ client }) => client?.profile?.phone ?? "",
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
                header: 'Asesor',
                accessorFn: ({ adviser }) => adviser?.profile?.name ?? "",
                accessorKey: 'adviser.profile.name',
                minSize: 200,
            },
            {
                header: 'Fecha de T.M',
                filterVariant: "date",
                accessorKey: 'details.topico.takingSampleSerologicalTest.date',
                accessorFn: ({ details }) => {
                    const dates = details.map(_ => fDate(_.travel.airlineReservation.departureDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.travel.airlineReservation.departureDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                minSize: 250
            },
            {
                header: 'Tipo de Muestra',
                accessorKey: 'details.topico.takingSampleSerologicalTest.typeSample',
                accessorFn: ({ details }) => details.map(_ => _?.topico?.takingSampleSerologicalTest?.typeSample),
                Cell: ({ cell }) => {
                    return cell.row.original.details.map(_ => {
                        const type = _.topico?.takingSampleSerologicalTest?.typeSample;
                        let color: LabelColor = "default";
                        if (type === "PR") color = "info";
                        if (type === "RV") color = "info";
                        if (type === "AYU") color = "warning";
                        return <Label color={color} width="100%">{type}
                        </Label>
                    });
                },
                minSize: 180
            },
            {
                header: 'Fecha del resultado',
                filterVariant: "date",
                accessorKey: 'details.documentation.rabiesSeroLogicalTest.resultDate',
                accessorFn: ({ details }) => {
                    const dates = details?.map(_ => fDate(_.documentation.rabiesSeroLogicalTest.resultDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                Cell: ({ cell }) => {
                    const dates = cell.row.original.details.map(_ => fDate(_.documentation.rabiesSeroLogicalTest.resultDate, 'DD/MM/YYYY'));
                    return dates.join(", ")
                },
                minSize: 250
            },
            {
                header: 'Fecha de contrato',
                filterVariant: "date",
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
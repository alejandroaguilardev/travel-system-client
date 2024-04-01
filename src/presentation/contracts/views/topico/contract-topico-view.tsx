import { Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { ContractTable } from '../../components/table/contract-table';
import { CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';
import { RenderRowActionMenuItem } from 'src/components/material-table/render-row-action-menu-item';
import { useColumnsTopico } from '../../components/table/columns/use-columns-topico';
import { TOPICO_TABS } from '../../components/form-topico/topico-form';

export default function ContractTopicoView() {
    const columns = useColumnsTopico();

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Fase Topico"
                links={[
                    { name: 'Topico', href: paths.dashboard.faseDocumentation.topico.list },
                    {
                        name: 'Listado',
                    }
                ]}
            />
            <ContractTable
                options={{
                    columnQueryFilters: [...CONTRACT_STATUS_IN_COURSE],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    columns,
                    renderRowActionMenuItems: (row) => [
                        <RenderRowActionMenuItem
                            item={{
                                name: "Medidas y Peso",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.measurementsAndWeightForm)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Microchip",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.chip)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Vacunación",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.vaccination)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Vacuna de Rabia",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.rabiesVaccination)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Revacuna de Rabia",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.rabiesReVaccination)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Revisión de microchip",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.chipReview)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Toma de muestra",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.takingSampleSerologicalTest)
                            }}
                        />,
                    ]
                }}
            />
        </Container>
    );
}

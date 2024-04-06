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
                    renderRowActionMenuItems: (row) => {
                        const addActionsItems = [<RenderRowActionMenuItem
                            item={{
                                name: "Medidas y Peso",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.measurementsAndWeightForm)
                            }}
                        />];

                        const chipCertificate = row.details.filter(_ => _.documentation.chipCertificate.hasServiceIncluded);
                        if (chipCertificate.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Microchip",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.chip)
                                }}
                            />)
                        }

                        const vaccinationCertificate = row.details.filter(_ => _.documentation.vaccinationCertificate.hasServiceIncluded);
                        if (vaccinationCertificate.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Vacunación",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.vaccination)
                                }}
                            />)
                        }

                        const rabiesSeroLogicalTest = row.details.filter(_ => _.documentation.rabiesSeroLogicalTest.hasServiceIncluded);
                        if (rabiesSeroLogicalTest.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Vacuna de Rabia",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.rabiesVaccination)
                                }}
                            />)
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Revacuna de Rabia",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.rabiesReVaccination)
                                }}
                            />)
                        }

                        if (chipCertificate.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Revisión de microchip",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.chipReview)
                                }}
                            />)
                        }
                        if (rabiesSeroLogicalTest.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Toma de muestra",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TOPICO_TABS.takingSampleSerologicalTest)
                                }}
                            />)
                        }
                        return addActionsItems;
                    }
                }}
            />
        </Container>
    );
}

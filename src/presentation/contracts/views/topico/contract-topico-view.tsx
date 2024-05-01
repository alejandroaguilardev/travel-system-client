import { Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { ContractTable } from '../../components/table/contract-table';
import { CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';
import { RenderRowActionMenuItem } from 'src/components/material-table/render-row-action-menu-item';
import { useColumnsTopico } from '../../components/table/columns/use-columns-topico';
import { TopicTabs } from '../../components/form-topico/topico-form';

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
                                name: "Admisión",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.admission)
                            }}
                        />];

                        const chipCertificate = row.details.filter(_ => _.documentation.chipCertificate.hasServiceIncluded);
                        if (chipCertificate.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Microchip",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.chip)
                                }}
                            />)
                        }

                        const vaccinationCertificate = row.details.filter(_ => _.documentation.vaccinationCertificate.hasServiceIncluded);
                        if (vaccinationCertificate.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Vacunación",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.vaccination)
                                }}
                            />)
                        }

                        const rabiesSeroLogicalTest = row.details.filter(_ => _.documentation.rabiesSeroLogicalTest.hasServiceIncluded);
                        if (rabiesSeroLogicalTest.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Vacuna de Rabia",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.rabiesVaccination)
                                }}
                            />)
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Revacuna de Rabia",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.rabiesReVaccination)
                                }}
                            />)
                        }

                        if (chipCertificate.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Revisión de microchip",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.chipReview)
                                }}
                            />)
                        }
                        if (rabiesSeroLogicalTest.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Toma de muestra",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.takingSampleSerologicalTest)
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

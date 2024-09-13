import { Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { ContractTable } from '../../components/table/contract-table';
import { CONTRACT_SORT_PENDING_DEFAULT, CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';
import { RenderRowActionMenuItem } from 'src/components/material-table/render-row-action-menu-item';
import { useColumnsTopico } from '../../components/table/columns/use-columns-topico';
import { TopicTabs } from '../../components/form-topico/topico-form';
import { hasShowReviewChip } from '../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export default function ContractTopicoView() {
    const columns = useColumnsTopico();

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Fase Tópico"
                links={[
                    { name: 'Tópico', href: paths.dashboard.faseDocumentation.topico.list },
                    {
                        name: 'Listado',
                    }
                ]}
            />
            <ContractTable
                options={{
                    columnQueryFilters: [...CONTRACT_STATUS_IN_COURSE],
                    sortingQueryFilters: [...CONTRACT_SORT_PENDING_DEFAULT],
                    columns,
                    renderRowActionMenuItems: (row) => {
                        const addActionsItems = [<RenderRowActionMenuItem
                            item={{
                                name: "Admisión",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.admission)
                            }}
                        />];

                        if (row.details.filter(_ => _?.topico?.chip?.hasIncluded)?.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Microchip",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.chip)
                                }}
                            />)
                        }

                        if (row.details.filter(_ => _?.topico?.vaccination?.hasIncluded)?.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Vacunación",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.vaccination)
                                }}
                            />)
                        }

                        if (row?.details?.filter(_ => _?.topico?.rabiesVaccination?.hasIncluded)?.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Vacuna de Rabia",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.rabiesVaccination)
                                }}
                            />)
                        }
                        if (row?.details?.filter(_ => _.topico?.rabiesReVaccination?.hasIncluded)?.length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Revacuna de Rabia",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.rabiesReVaccination)
                                }}
                            />)
                        }

                        const reviews: boolean[] = row?.details?.map((detail) => hasShowReviewChip(detail?.topico)) ?? [];
                        if (reviews.filter(_ => _).length > 0) {
                            addActionsItems.push(<RenderRowActionMenuItem
                                item={{
                                    name: "Revisión de microchip",
                                    icon: "infoFill",
                                    href: paths.dashboard.faseDocumentation.topico.management(row.id, TopicTabs.chipReview)
                                }}
                            />)
                        }
                        if (row?.details?.filter(_ => _?.topico?.takingSampleSerologicalTest?.hasIncluded)?.length > 0) {
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

import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { ContractTable } from '../../components/table/contract-table';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';
import { RenderRowActionMenuItem } from 'src/components/material-table/render-row-action-menu-item';

export default function ContractTopicoView() {

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
                action={
                    <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.CREATE}>
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.contracts.new}
                            variant="contained"
                        >
                            Nuevo Contrato
                        </Button>
                    </PermissionGuard>
                }
            />
            <ContractTable
                options={{
                    columnQueryFilters: [...CONTRACT_STATUS_IN_COURSE],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActionMenuItems: (row) => [
                        <RenderRowActionMenuItem
                            item={{
                                name: "Medidas y Peso",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, "medidas")
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Microchip",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, "medidas")
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Vacunación",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, "medidas")
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Vacuna de Rabia",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, "medidas")
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Revacuna de Rabia",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, "medidas")
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Revisión de microchip",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, "medidas")
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Toma de muestra",
                                icon: "number",
                                href: paths.dashboard.faseDocumentation.topico.management(row.id, "medidas")
                            }}
                        />,
                    ]
                }}
            />
        </Container>
    );
}

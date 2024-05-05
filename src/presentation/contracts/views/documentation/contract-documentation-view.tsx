import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { ContractTable } from '../../components/table/contract-table';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { CONTRACT_SORT_PENDING_DEFAULT, CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';
import { useColumnsDocumentation } from '../../components/table/columns/use-columns-documentation';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { DOCUMENTATION_KEYS } from '../../../../modules/contracts/domain/contract-services/documentation/documentation';

export default function ContractDocumentationView() {
    const columns = useColumnsDocumentation();

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Fase Documentación"
                links={[
                    { name: 'Contratos', href: paths.dashboard.contracts.root },
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
                    sortingQueryFilters: [...CONTRACT_SORT_PENDING_DEFAULT],
                    columns,
                    renderRowActionMenuItems: (row) => [
                        <RenderRowActionMenuItem
                            item={{
                                name: "Certificado de microchip",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.documentation.management(row.id, DOCUMENTATION_KEYS.chipCertificate)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Certificado de vacuna",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.documentation.management(row.id, DOCUMENTATION_KEYS.vaccinationCertificate)
                            }}
                        />,

                        <RenderRowActionMenuItem
                            item={{
                                name: "Permiso de importación",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.documentation.management(row.id, DOCUMENTATION_KEYS.importLicense)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Certificado de Salud",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.documentation.management(row.id, DOCUMENTATION_KEYS.healthCertificate)
                            }}
                        />,
                        <RenderRowActionMenuItem
                            item={{
                                name: "Certificado de soporte emocional",
                                icon: "infoFill",
                                href: paths.dashboard.faseDocumentation.documentation.management(row.id, DOCUMENTATION_KEYS.emotionalSupportCertificate)
                            }}
                        />,
                    ]
                }}
            />
        </Container>
    );
}

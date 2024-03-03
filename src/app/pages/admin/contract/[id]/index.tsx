import { Helmet } from 'react-helmet-async';
import ContractIdView from '../../../../../presentation/contracts/views/contract-id-view';
import ContractEditView from '../../../../../presentation/contracts/views/contract-edit-view';
import NotFoundView from '../../../../../presentation/error/500-view';
import { useParams } from '../../../../routes/hooks/use-params';
import ContractDocumentationView from '../../../../../presentation/contracts/views/contract-documentation-view';
import ContractCageView from '../../../../../presentation/contracts/views/contract-cage-view';
import ContractTravelView from '../../../../../presentation/contracts/views/contract-travel-view';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';

enum RoutesActions {
    VIEW = "visualizar",
    EDIT = "editar",
    DOCUMENTATION = "documentacion",
    CAGE = "jaula",
    TRAVEL = "viaje",
}

export default function ContractIdPage() {
    const { user } = useAuthContext();
    const params = useParams();
    const { id } = params;
    const action = params.action as RoutesActions;

    if (!id || !action || ![RoutesActions.EDIT, RoutesActions.VIEW, RoutesActions.DOCUMENTATION, RoutesActions.CAGE, RoutesActions.TRAVEL].includes(action)) {
        return <NotFoundView />;
    }

    return (
        <>
            <Helmet>
                <title> Contrato</title>
            </Helmet>
            {action === RoutesActions.VIEW &&
                <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.READ}>
                    <ContractIdView id={id} />
                </RoutePermissionGuard>}

            {action === RoutesActions.EDIT &&
                <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.EDIT}>
                    <ContractEditView id={id} />
                </RoutePermissionGuard>
            }

            {action === RoutesActions.DOCUMENTATION &&
                <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.DOCUMENTATION}>
                    <ContractDocumentationView id={id} />
                </RoutePermissionGuard>
            }

            {action === RoutesActions.CAGE &&
                <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.CAGE}>
                    <ContractCageView id={id} />
                </RoutePermissionGuard>
            }

            {action === RoutesActions.TRAVEL &&
                <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.TRAVEL}>
                    <ContractTravelView id={id} />
                </RoutePermissionGuard>
            }
        </>
    );
}

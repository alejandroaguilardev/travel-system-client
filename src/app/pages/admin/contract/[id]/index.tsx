import { Helmet } from 'react-helmet-async';
import ContractIdView from '../../../../../presentation/contracts/views/crud/contract-id-view';
import ContractEditView from '../../../../../presentation/contracts/views/crud/contract-edit-view';
import NotFoundView from '../../../../../presentation/error/500-view';
import { useParams } from '../../../../routes/hooks/use-params';
import ContractDocumentationView from '../../../../../presentation/contracts/views/documentation/contract-documentation-update-view';
import { RoutePermissionGuard } from '../../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../../modules/auth/domain/auth-permission';
import ContractClientView from '../../../../../presentation/contracts/views/client/contract-client-view';
import ContractPetView from '../../../../../presentation/contracts/views/history/contract-pet-view';

enum RoutesActions {
    VIEW = "visualizar",
    EDIT = "editar",
    DOCUMENTATION = "documentacion",
    CLIENT = "cliente",
    PET = "mascota",
}

export default function ContractIdPage() {
    const { user } = useAuthContext();
    const params = useParams();
    const { id } = params;
    const action = params.action as RoutesActions;

    if (!id || !action || ![RoutesActions.EDIT, RoutesActions.VIEW, RoutesActions.DOCUMENTATION, RoutesActions.PET].includes(action)) {
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

            {action === RoutesActions.CLIENT &&
                <RoutePermissionGuard user={user} group={AuthGroup.CONTRACTS} permission={AuthPermission.READ}>
                    <ContractClientView id={id} />
                </RoutePermissionGuard>
            }

            {action === RoutesActions.PET &&
                <RoutePermissionGuard
                    user={user}
                    group={AuthGroup.CONTRACTS}
                    permission={AuthPermission.READ}
                >
                    <ContractPetView id={id} />
                </RoutePermissionGuard>
            }
        </>
    );
}

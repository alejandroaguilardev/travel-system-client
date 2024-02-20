import { useParams } from '../hooks';
import { RoutesActions } from '../types/routes-action';
import NotFoundView from '../../../presentation/error/not-found-view';
import { RoutePermissionGuard } from './route-permission.guard';
import { useAuthContext } from '../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';

type Props = {
    Edit: React.FC<{ id: string }>;
    View: React.FC<{ id: string }>;
    group: AuthGroup;
};

export default function SearchIdNotFoundParams({ Edit, View, group }: Props) {
    const { user } = useAuthContext();
    const params = useParams();
    const { id } = params;
    const action = params.action as RoutesActions;

    if (!id || !action || ![RoutesActions.EDIT, RoutesActions.VIEW].includes(action)) {
        return <NotFoundView />;
    }
    return (<>
        {action === RoutesActions.VIEW
            ? <RoutePermissionGuard user={user} group={group} permission={AuthPermission.READ}>
                <View id={id} />
            </RoutePermissionGuard>
            : <RoutePermissionGuard user={user} group={group} permission={AuthPermission.EDIT}>
                <Edit id={id} />
            </RoutePermissionGuard>
        }
    </>
    )

}

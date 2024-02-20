import { Helmet } from 'react-helmet-async';
import UserView from '../../../../presentation/users/views/user/user-view';
import { RoutePermissionGuard } from '../../../routes/guard/route-permission.guard';
import { useAuthContext } from '../../../../presentation/auth/hooks/use-auth-context';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';


export default function UserPage() {
  const { user } = useAuthContext();

  return (
    <>
      <Helmet>
        <title> Dashboard Usuarios</title>
      </Helmet>
      <RoutePermissionGuard user={user} group={AuthGroup.USERS} permission={AuthPermission.LIST}>
        <UserView />
      </RoutePermissionGuard>
    </>
  );
}
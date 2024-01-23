import { Helmet } from 'react-helmet-async';
import UserView from '../../../../presentation/users/views/user-view';


export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard Usuarios</title>
      </Helmet>

      <UserView />
    </>
  );
}
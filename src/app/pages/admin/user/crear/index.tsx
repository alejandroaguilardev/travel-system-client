import { Helmet } from 'react-helmet-async';
import UserNewView from '../../../../../presentation/users/views/user-new-view';


export default function RoleNewPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Crear Rol</title>
            </Helmet>

            <UserNewView />
        </>
    );
}
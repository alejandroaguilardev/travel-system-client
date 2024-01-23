import { Helmet } from 'react-helmet-async';
import RoleNewView from '../../../../../presentation/roles/views/role-new-view';


export default function RoleNewPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Crear Rol</title>
            </Helmet>

            <RoleNewView />
        </>
    );
}
import { Helmet } from 'react-helmet-async';
import RolesView from '../../../../presentation/roles/views/role-view';


export default function RolePage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Roles</title>
            </Helmet>

            <RolesView />
        </>
    );
}
import { Helmet } from 'react-helmet-async';
import PermissionView from '../../../../presentation/permission/views/permission-view';


export default function PermissionPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Permisos</title>
            </Helmet>

            <PermissionView />
        </>
    );
}
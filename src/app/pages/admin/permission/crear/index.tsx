import { Helmet } from 'react-helmet-async';
import PermissionNewView from '../../../../../presentation/permission/views/permission-new-view';


export default function PermissionNewPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard Crear Permisos</title>
            </Helmet>

            <PermissionNewView />
        </>
    );
}
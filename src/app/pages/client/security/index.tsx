import { Helmet } from 'react-helmet-async';
import UserSecurityView from '../../../../presentation/client/views/client-security-view';


export default function SecurityPage() {
    return (
        <>
            <Helmet>
                <title> Cambiar Contraseña</title>
            </Helmet>
            <UserSecurityView />
        </>
    );
}
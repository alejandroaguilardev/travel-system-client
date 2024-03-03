import { Helmet } from 'react-helmet-async';
import RecoverView from '../../../presentation/auth/recover-view';


export default function RecoverPage() {
    return (
        <>
            <Helmet>
                <title> Pet travel recuperar la contraseña</title>
            </Helmet>

            <RecoverView />
        </>
    );
}

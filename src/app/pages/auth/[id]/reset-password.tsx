import { Helmet } from 'react-helmet-async';
import ResetPasswordView from '../../../../presentation/auth/reset-password';


export default function ResetPasswordPage() {
    return (
        <>
            <Helmet>
                <title> Pet travel cambiar contraseña</title>
            </Helmet>

            <ResetPasswordView />
        </>
    );
}

import { Helmet } from 'react-helmet-async';
import LoginView from '../../../presentation/auth/login-view';


export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Pet travel iniciar sesión</title>
      </Helmet>

      <LoginView />
    </>
  );
}

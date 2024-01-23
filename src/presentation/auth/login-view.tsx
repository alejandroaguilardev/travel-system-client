import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import { PATH_AFTER_LOGIN, PATH_AFTER_LOGIN_CLIENT } from '../../app/config/config-global';
import { useSearchParams } from '../../app/routes/hooks/use-search-params';
import { useRouter } from '../../app/routes/hooks/use-router';
import { HeadLogin } from './components/head-login';
import { LoginForm } from './components/login-form';
import FormProvider from '../../components/hook-form/form-provider';
import { LoginSchema, defaultValues } from './utils/login-validation-form';
import { useAuthContext } from './hooks';

export default function LoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [errorMsg, setErrorMsg] = useState('');


  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await login?.(data.email, data.password);
      const access = user.roles.length > 0 ? PATH_AFTER_LOGIN : PATH_AFTER_LOGIN_CLIENT;
      router.push(returnTo || access);
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <HeadLogin />

      <LoginForm errorMsg={errorMsg} />

      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end', mb: 2 }}>
        ¿Olvidaste tu contraseña?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          my: 1
        }}
      >
        Iniciar sesión
      </LoadingButton>
    </FormProvider>
  );
}

import { useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { HeadLogin } from './components/head-login';
import FormProvider from '../../components/hook-form/form-provider';
import { ResetPasswordForm } from './components/reset-password-form';
import { resetPasswordSchema, defaultValues } from './utils/reset-password-form';
import { authService } from '../../modules/auth/infrastructure/auth.service';
import { PATH_AFTER_LOGIN, PATH_AFTER_LOGIN_CLIENT } from '../../app/config/config-global';
import { useAuthContext } from './hooks';
import { useRouter } from '../../app/routes/hooks/use-router';
import { manageAccessToken } from '../../modules/auth/infrastructure/session';
import { executeReCaptcha } from './utils/execute-re-captcha';


export default function ResetPasswordView() {
    const params = useParams();
    const { token } = params;

    const [errorMsg, setErrorMsg] = useState('');

    const { login } = useAuthContext();
    const router = useRouter();


    const methods = useForm({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const verificadPassword = (password: string, passwordRepeat: string) => {
        if (password === passwordRepeat) {
            setErrorMsg("");
            return true;
        }
        setErrorMsg("La contraseña no coincide")
        return false
    }

    const onSubmit = handleSubmit(async (data) => {
        if (!verificadPassword(data.password, data.passwordRepeat)) return;
        try {
            const tokenReCaptcha = await executeReCaptcha();
            manageAccessToken(token ?? null)
            const response = await authService.resetPassword(data.password);
            const user = await login?.(response.user.email, data.password, tokenReCaptcha);

            const access = (user.roles.length > 0 || user?.auth?.admin) ? PATH_AFTER_LOGIN : PATH_AFTER_LOGIN_CLIENT;

            router.push(access);

        } catch (error) {
            reset();
            setErrorMsg(typeof error === 'string' ? error : error.message);
        }
    });


    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <HeadLogin title='Ingrese su nueva contraseña' />

            <ResetPasswordForm errorMsg={errorMsg} />

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
                Cambiar contraseña
            </LoadingButton>
        </FormProvider>
    );
}

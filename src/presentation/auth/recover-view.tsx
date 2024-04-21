import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import { HeadLogin } from './components/head-login';
import FormProvider from '../../components/hook-form/form-provider';
import { paths } from '../../app/routes/paths';
import { Alert, Box, Button } from '@mui/material';
import { RecoverForm } from './components/recover-form';
import { authService } from '../../modules/auth/infrastructure/auth.service';
import { RecoverSchema, defaultValues } from './utils/recover-validation-form';
import { useMessage } from '../../hooks/use-message';
import { executeReCaptcha } from './utils/execute-re-captcha';

export default function RecoverView() {
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState('');
    const { showNotification } = useMessage();


    const methods = useForm({
        resolver: yupResolver(RecoverSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const tokenReCaptcha = await executeReCaptcha();
            const response = await authService.recover(data.email, tokenReCaptcha);
            showNotification(response.message, { variant: "success" });
            setSuccess(response.message);
        } catch (error) {
            reset();
            setErrorMsg(typeof error === 'string' ? error : error.message);
        }
    });


    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <HeadLogin title='Recuperar Contraseña' />
            {
                success
                    ? <Alert variant='outlined' >{success}</Alert>

                    : <RecoverForm errorMsg={errorMsg} />
            }



            {
                success ?
                    <Button
                        href={paths.auth.login}
                        variant='outlined'
                        color='primary'
                        size="large"
                        fullWidth
                        sx={{ my: 2 }}
                    >

                        Ir a inicio de sesión
                    </Button>
                    :
                    <Box sx={{ my: 1 }}>
                        <Link
                            href={paths.auth.login}
                            variant="body2"
                            color="inherit"
                            underline="always"
                        >
                            ¿Quieres Iniciar sesión?
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
                            Recuperar
                        </LoadingButton>
                    </Box>
            }
        </FormProvider>
    );
}

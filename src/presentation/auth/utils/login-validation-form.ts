import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().required('El correo es requerido').email('debe ser un email valido'),
    password: Yup.string().required('La contraseña es requerida'),
});

export const defaultValues = {
    email: '',
    password: '',
};
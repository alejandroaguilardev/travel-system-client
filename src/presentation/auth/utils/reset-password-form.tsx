import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object().shape({
    password: Yup.string().required('La contraseña es requerida')
        .min(8, "La contraseña deben ser 8 dígitos")
        .max(128, "La contraseña no debe ser mayor a 8 dígitos"),
    passwordRepeat: Yup.string().required('La contraseña es requerida'),
});

export const defaultValues = {
    passwordRepeat: '',
    password: '',
};
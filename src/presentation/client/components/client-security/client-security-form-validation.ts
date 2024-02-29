import * as Yup from 'yup';

export type ChangePasswordSchema = {
    password: string;
    newPassword: string;
    passwordRepeat: string;
}

export const changePasswordSchema: Yup.ObjectSchema<ChangePasswordSchema> = Yup.object().shape({
    password: Yup.string().required('La contraseña es requerida')
        .min(8, "La contraseña deben ser 8 dígitos")
        .max(128, "La contraseña no debe ser mayor a 8 dígitos"),
    newPassword: Yup.string().required('La contraseña es requerida'),
    passwordRepeat: Yup.string().required('La contraseña es requerida'),
});

export const defaultValues: ChangePasswordSchema = {
    password: '',
    newPassword: '',
    passwordRepeat: '',
};
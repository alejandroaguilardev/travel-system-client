import * as Yup from 'yup';

export const RecoverSchema = Yup.object().shape({
    email: Yup.string().required('El correo es requerido').email('debe ser un email valido'),
});

export const defaultValues = {
    email: '',
};
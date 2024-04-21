import * as Yup from 'yup';
import { PROFILE_DOCUMENT } from '../../../modules/users/domain/profile/profile-document';

export const LoginSchema = Yup.object().shape({
    document: Yup.string()
        .oneOf(PROFILE_DOCUMENT)
        .required("El documento es requerido"),
    documentNumber: Yup.string()
        .min(1, "El número de documento debe tener al menos un carácter")
        .max(45, "El número de documento debe tener como máximo 45 caracteres")
        .required("El número de documento es requerido"),
    password: Yup.string().required('La contraseña es requerida'),
});

export const defaultValues = {
    document: PROFILE_DOCUMENT[0],
    documentNumber: '',
    password: '',
};
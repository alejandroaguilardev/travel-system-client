import * as Yup from 'yup';
import { PROFILE_DOCUMENT } from '../../../../modules/users/domain/profile/profile-document';
import { ProfileInterface } from '../../../../modules/users/domain/user-profile.interface';

const defaultValues: ProfileInterface = {
    document: PROFILE_DOCUMENT[0],
    documentNumber: "",
    name: "",
    secondName: "",
    lastName: "",
    secondLastName: "",
    phone: "",
    gender: "male",
    birthDate: new Date(),
    department: "",
    province: "",
    district: "",
    direction: "",

};
const profileSchema: Yup.ObjectSchema<ProfileInterface> = Yup.object().shape({
    document: Yup.string()
        .oneOf(PROFILE_DOCUMENT)
        .required("El documento es requerido"),
    documentNumber: Yup.string()
        .min(1, "El número de documento debe tener al menos un carácter")
        .max(45, "El número de documento debe tener como máximo 45 caracteres")
        .required("El número de documento es requerido"),
    name: Yup.string()
        .required("El nombre es requerido")
        .min(1, "El nombre debe tener al menos un carácter")
        .max(45, "El nombre debe tener como máximo 45 caracteres")
        .matches(/^[a-zA-Z0-9\s]+$/, "El nombre solo puede contener letras y números"),
    secondName: Yup.string()
        .max(45, "El segundo nombre debe tener como máximo 45 caracteres")
        .matches(/^[a-zA-Z0-9\s]*$/, "El segundo nombre solo puede contener letras, números y espacios"),
    lastName: Yup.string()
        .required("El apellido es requerido")
        .min(1, "El apellido debe tener al menos un carácter")
        .max(45, "El apellido debe tener como máximo 45 caracteres")
        .matches(/^[a-zA-Z0-9\s]+$/, "El apellido solo puede contener letras y números"),
    secondLastName: Yup.string()
        .max(45, "El segundo apellido debe tener como máximo 45 caracteres")
        .matches(/^[a-zA-Z0-9\s]*$/, "El segundo apellido solo puede contener letras, números y espacios"),
    phone: Yup.string().required("El teléfono es requerido"),
    gender: Yup.string().oneOf(['male', 'female']).required("El sexo es requerido"),
    birthDate: Yup.date(),
    department: Yup.string(),
    province: Yup.string(),
    district: Yup.string(),
    direction: Yup.string(),
});

export { defaultValues, profileSchema };

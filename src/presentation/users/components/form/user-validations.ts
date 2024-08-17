import * as Yup from 'yup';
import { NewUser } from '../../../../modules/users/domain/user';
import { STATUS } from '../../../../modules/shared/domain/status';
import { PROFILE_DOCUMENT } from '../../../../modules/users/domain/profile/profile-document';

const defaultValues: NewUser = {
    id: "",
    email: "",
    roles: [],
    profile: {
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
    },
    user: "",
    status: "active",
    auth: {
        admin: false,
        user: false,
    },
    isAdvisor: false,
    isDoctor: false,
    linkWhatsApp: "",
};
const userSchema: Yup.ObjectSchema<NewUser> = Yup.object().shape({
    id: Yup.string(),
    email: Yup.string()
        .required("El email es requerido")
        .email("El formato del email no es válido"),
    roles: Yup.array().of(Yup.string() as Yup.StringSchema<string>),
    profile: Yup.object().shape({
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
            .max(45, "El nombre debe tener como máximo 45 caracteres"),
        secondName: Yup.string()
            .max(45, "El segundo nombre debe tener como máximo 45 caracteres"),
        lastName: Yup.string()
            .required("El apellido es requerido")
            .min(1, "El apellido debe tener al menos un carácter")
            .max(45, "El apellido debe tener como máximo 45 caracteres"),
        secondLastName: Yup.string()
            .max(45, "El segundo apellido debe tener como máximo 45 caracteres"),
        phone: Yup.string().required("El teléfono es requerido"),
        gender: Yup.string().oneOf(['male', 'female']).required("El sexo es requerido"),
        birthDate: Yup.date(),
        department: Yup.string(),
        province: Yup.string(),
        district: Yup.string(),
        direction: Yup.string(),
    }),
    user: Yup.string(),
    status: Yup.string().oneOf(STATUS),
    auth: Yup.object().shape({
        admin: Yup.boolean(),
        user: Yup.boolean(),
    }),
    isAdvisor: Yup.boolean(),
    isDoctor: Yup.boolean(),
    linkWhatsApp: Yup.string(),
});

export { defaultValues, userSchema };

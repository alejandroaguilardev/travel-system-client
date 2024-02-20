import * as Yup from 'yup';
import { NewUser } from '../../../../modules/users/domain/user';
import { STATUS } from '../../../../modules/shared/domain/status';

const defaultValues: NewUser = {
    id: "",
    email: "",
    roles: [],
    profile: {
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
    },
};
const userSchema: Yup.ObjectSchema<NewUser> = Yup.object().shape({
    id: Yup.string(),
    email: Yup.string()
        .required("El email es requerido")
        .email("El formato del email no es válido"),
    roles: Yup.array().of(Yup.string() as Yup.StringSchema<string>),
    profile: Yup.object().shape({
        name: Yup.string()
            .required("El nombre es requerido")
            .min(1, "El nombre debe tener al menos un carácter")
            .max(45, "El nombre debe tener como máximo 20 caracteres")
            .matches(/^[a-zA-Z0-9\s]+$/, "El nombre solo puede contener letras y números"),
        secondName: Yup.string()
            .max(45, "El segundo nombre debe tener como máximo 20 caracteres")
            .matches(/^[a-zA-Z0-9\s]*$/, "El segundo nombre solo puede contener letras, números y espacios"),
        lastName: Yup.string()
            .required("El apellido es requerido")
            .min(1, "El apellido debe tener al menos un carácter")
            .max(45, "El apellido debe tener como máximo 20 caracteres")
            .matches(/^[a-zA-Z0-9\s]+$/, "El apellido solo puede contener letras y números"),
        secondLastName: Yup.string()
            .max(45, "El segundo apellido debe tener como máximo 20 caracteres")
            .matches(/^[a-zA-Z0-9\s]*$/, "El segundo apellido solo puede contener letras, números y espacios"),
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
    }),
});

export { defaultValues, userSchema };

import * as Yup from 'yup';
import { NewUser } from '../../../../modules/users/domain/user';

const defaultValues: NewUser = {
    id: "",
    name: "",
    secondName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    roles: [],
};

const userSchema: Yup.ObjectSchema<NewUser> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .required("El nombre es requerido")
        .min(1, "El nombre debe tener al menos un carácter")
        .max(20, "El nombre debe tener como máximo 20 caracteres")
        .matches(/^[a-zA-Z0-9\s]+$/, "El nombre solo puede contener letras y números"),
    secondName: Yup.string()
        .max(20, "El segundo nombre debe tener como máximo 20 caracteres")
        .matches(/^[a-zA-Z0-9\s]*$/, "El segundo nombre solo puede contener letras, números y espacios"),
    lastName: Yup.string()
        .required("El apellido es requerido")
        .min(1, "El apellido debe tener al menos un carácter")
        .max(20, "El apellido debe tener como máximo 20 caracteres")
        .matches(/^[a-zA-Z0-9\s]+$/, "El apellido solo puede contener letras y números"),
    secondLastName: Yup.string()
        .max(20, "El segundo apellido debe tener como máximo 20 caracteres")
        .matches(/^[a-zA-Z0-9\s]*$/, "El segundo apellido solo puede contener letras, números y espacios"),
    email: Yup.string()
        .required("El email es requerido")
        .email("El formato del email no es válido"),
    roles: Yup.array(),
    password: Yup.string()
});

export { defaultValues, userSchema };

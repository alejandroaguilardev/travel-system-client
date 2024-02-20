import * as Yup from 'yup';
import { NewPet } from '../../../../modules/pets/domain/pet';
import { STATUS } from '../../../../modules/shared/domain/status';

const defaultValues: NewPet = {
    id: "",
    name: "",
    race: "",
    gender: "male",
    birthDate: new Date(),
    chip: "",
    chipDate: null,
    color: "",
    image: "",
    country: "Perú",
    type: "",
    sterilized: "No",
};

const petSchema: Yup.ObjectSchema<NewPet> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .required("El tipo es requerido")
        .min(1, "El tipo debe tener al menos un carácter")
        .max(45, "El tipo debe tener como máximo 45 caracteres"),
    race: Yup.string()
        .required("El tipo es requerido")
        .min(1, "El tipo debe tener al menos un carácter")
        .max(45, "El tipo debe tener como máximo 45 caracteres"),
    gender: Yup.string()
        .oneOf(['male', 'female'], "Seleccione una opción válida")
        .required("El tipo es requerido"),
    birthDate: Yup.date()
        .required("El tipo es requerido"),
    chip: Yup.string()
        .max(25, "El tipo debe tener como máximo 20 caracteres"),
    chipDate: Yup.date().nullable(),
    color: Yup.string()
        .required("El tipo es requerido")
        .min(1, "El tipo debe tener al menos un carácter")
        .max(255, "El tipo debe tener como máximo 255 caracteres"),
    image: Yup.string()
        .max(255, "El tipo debe tener como máximo 255 caracteres"),
    country: Yup.string()
        .required("El tipo es requerido")
        .min(1, "El tipo debe tener al menos un carácter")
        .max(255, "El tipo debe tener como máximo 255 caracteres"),
    type: Yup.string()
        .required("El tipo es requerido")
        .min(1, "El tipo debe tener al menos un carácter")
        .max(50, "El tipo debe tener como máximo 255 caracteres"),
    sterilized: Yup.string()
        .required("El tipo es requerido")
        .min(1, "El tipo debe tener al menos un carácter")
        .max(3, "El tipo debe tener como máximo 255 caracteres"),
    user: Yup.string(),
});

export { defaultValues, petSchema };

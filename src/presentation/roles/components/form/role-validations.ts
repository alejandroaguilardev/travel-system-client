import * as Yup from 'yup';
import { NewRole } from '../../../../modules/roles/domain/role';

const defaultValues: NewRole = {
    id: "",
    name: "",
    description: "",
    permissions: [],
};

const roleSchema: Yup.ObjectSchema<NewRole> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .required("El nombre es requerido")
        .min(1, "El nombre tener al menos un carácter")
        .max(30, "El nombre debe tener como máximo 20 caracteres")
        .matches(/^[a-zA-Z0-9\s]+$/, "El nombre solo puede contener letras y números"),
    description: Yup.string()
        .max(255, "La descripción no debe exceder los 255 caracteres"),
    permissions: Yup.array().default([])
});

export { defaultValues, roleSchema };

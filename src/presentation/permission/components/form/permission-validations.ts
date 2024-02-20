import * as Yup from 'yup';
import { NewPermission } from '../../../../modules/permissions/domain/permission';

const defaultValues: NewPermission = {
    id: "",
    name: "",
    description: "",
    group: "",
};

const permissionSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .required("El nombre es requerido")
        .min(1, "El nombre tener al menos un carácter")
        .max(30, "El nombre debe tener como máximo 20 caracteres")
        .matches(/^[a-zA-Z0-9\s]+$/, "El nombre solo puede contener letras y números"),
    group: Yup.string()
        .required("El grupo es requerido")
        .min(1, "El grupo debe tener al menos un carácter")
        .max(30, "El grupo debe tener como máximo 20 caracteres")
        .matches(/^[a-zA-Z0-9\s]+$/, "El nombre solo puede contener letras y números"),
    description: Yup.string()
        .max(255, "La descripción no debe exceder los 255 caracteres"),
});

export { defaultValues, permissionSchema };

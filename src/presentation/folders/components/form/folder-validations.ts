import * as Yup from 'yup';
import { NewFolder } from '../../../../modules/folders/domain/folder';

const defaultValues: NewFolder = {
    id: "",
    name: "Folder-",
    quantity: 100,
    user: "",
};

const folderSchema: Yup.ObjectSchema<NewFolder> = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string()
        .required("El nombre  es requerido")
        .min(1, "El nombre debe tener al menos un carácter")
        .max(255, "El nombre debe tener como máximo 255 caracteres"),
    quantity: Yup.number()
        .typeError("La cantidad de sobres debe ser un número")
        .required("La cantidad de sobres es requerida")
        .min(1, "El modelo debe tener al menos un carácter")
        .test('is-number', 'La cantidad de sobres debe ser un número válido', value => !isNaN(value)),
    user: Yup.string()
});

export { defaultValues, folderSchema };

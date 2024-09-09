import * as Yup from 'yup';
import { NewCage } from '../../../../modules/cages/domain/cage';

const defaultValues: NewCage = {
    id: "",
    typeCage: "",
    modelCage: "",
    dimensionsCage: "",
    user: "",
};

const cageSchema: Yup.ObjectSchema<NewCage> = Yup.object().shape({
    id: Yup.string(),
    typeCage: Yup.string()
        .required("El tipo es requerido")
        .min(1, "El tipo debe tener al menos un carácter")
        .max(255, "El tipo debe tener como máximo 255 caracteres"),
    modelCage: Yup.string()
        .required("El modelo es requerido")
        .min(1, "El modelo debe tener al menos un carácter")
        .max(255, "El modelo debe tener como máximo 20 caracteres"),
    dimensionsCage: Yup.string()
        .required("La dimensión es requerido")
        .min(1, "La dimensión debe tener al menos un carácter")
        .max(255, "La dimensión no debe exceder los 255 caracteres"),
    user: Yup.string()
});

export { defaultValues, cageSchema };

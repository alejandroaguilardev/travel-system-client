import * as Yup from 'yup';
import { NewPet } from '../../../../../modules/pets/domain/pet';
import { CAGE_TYPE } from 'src/modules/cages/domain/cage-type';
import { MeasurementsAndWeight } from '../../../../../modules/pets/domain/pet-measurements-and-weight';
import { CageChosen } from '../../../../../modules/contracts/domain/contract-services/cage/cage-chosen';


export interface MeasurementsAndWeightFormSchema extends Omit<NewPet, "id" | "name" | "birthDate" | "image" | "country" | "chip" | "chipDate" | "adopter"> {
    cageRecommendation?: CageChosen;
    measurementsAndWeight?: MeasurementsAndWeight;

}

export const measurementsAndWeightFormObjectSchema: Yup.ObjectSchema<MeasurementsAndWeightFormSchema> = Yup.object().shape({
    race: Yup.string()
        .required("El tipo es requerido")
        .min(1, "El tipo debe tener al menos un carácter")
        .max(45, "El tipo debe tener como máximo 45 caracteres"),
    gender: Yup.string()
        .oneOf(['male', 'female'], "Seleccione una opción válida")
        .required("El tipo es requerido"),
    color: Yup.string()
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
    cageRecommendation: Yup.object().shape({
        modelCage: Yup.string().required("El modelo de la jaula es requerido"),
        dimensionsCage: Yup.string().required("La dimensión de la jaula requerido"),
        typeCage: Yup.string().oneOf(['', ...CAGE_TYPE] as const),
    }),
    measurementsAndWeight: Yup.object().shape({
        weight: Yup.number().required("El Peso de la mascota es requerido"),
        height: Yup.number().required("El alto de la mascota es requerido"),
        width: Yup.number().required("El ancho de la mascota es requerido"),
        length: Yup.number().required("El largo de la mascota es requerido"),
    }).required("El Peso y las medidas de la mascota es requerido"),
});

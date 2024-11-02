import * as Yup from 'yup';
import { NewPet, PetTopic } from '../../../../modules/pets/domain/pet';
import { CAGE_TYPE } from '../../../../modules/cages/domain/cage-type';

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
    type: "Canino",
    sterilized: "No",
    adopter: "",
    isBrachycephalic: false,
    isPotentiallyDangerous: false,
};

export const chipValidationYup = Yup.string()
    .test(
        'is-true',
        'El chip debe empezar con el dígito 9',
        value => {
            if (value === "") return true;
            if (value?.substring(0, 1) == "9") return true;
            return false;
        }
    )
    .test(
        'is-true',
        'El microchip debe ser de 15 dígitos',
        value => {
            if (value === "") return true;
            if (value?.length === 15) return true;
            return false;
        }
    );

const generalSchema = {
    id: Yup.string(),
    name: Yup.string()
        .required("El nombre es requerido")
        .min(1, "El nombre debe tener al menos un carácter")
        .max(45, "El nombre debe tener como máximo 45 caracteres"),
    gender: Yup.string()
        .oneOf(['male', 'female'], "Seleccione una opción válida")
        .required("El sexo es requerido"),
    birthDate: Yup.date()
        .required("La fecha de nacimiento es requerido"),
    chip: chipValidationYup,
    chipDate: Yup.date().nullable(),
    color: Yup.string()
        .required("El color es requerido")
        .min(1, "El color debe tener al menos un carácter")
        .max(255, "El color debe tener como máximo 255 caracteres"),
    image: Yup.string()
        .max(255, "La imagen debe tener como máximo 255 caracteres"),
    country: Yup.string()
        .required("El país es requerido")
        .min(1, "El país debe tener al menos un carácter")
        .max(255, "El país debe tener como máximo 255 caracteres"),
    type: Yup.string()
        .required("La especie es requerido")
        .min(1, "La especie debe tener al menos un carácter")
        .max(50, "La especie debe tener como máximo 255 caracteres"),
    race: Yup.string()
        .required("La raza es requerido")
        .min(1, "La raza debe tener al menos un carácter")
        .max(45, "La raza debe tener como máximo 45 caracteres"),
    sterilized: Yup.string()
        .required("Indique si esta esterilizado si o no")
        .test(
            'is-true',
            'La esterilización debe ser si o no',
            value => value?.toLowerCase() === "si" || value?.toLowerCase() === "no"
        ),

    adopter: Yup.string().required("El adopter es requerido"),
    isBrachycephalic: Yup.boolean().required("ebe indicar si la mascota es braquicefalia"),
    isPotentiallyDangerous: Yup.boolean().required("Debe indicar si la mascota es potencialmente peligrosa"),
    isPuppy: Yup.boolean(),
    user: Yup.string(),
}
const petSchema: Yup.ObjectSchema<NewPet> = Yup.object().shape(generalSchema)

export const defaultValuesTopic: PetTopic = {
    ...defaultValues,
    measurementsAndWeight: {
        weight: 0,
        height: 0,
        width: 0,
        length: 0,
        updatedAt: undefined,
    },
    cageRecommendation: {
        modelCage: "",
        dimensionsCage: "",
        typeCage: "",
    }
}

export const petSchemaTopic: Yup.ObjectSchema<PetTopic> = Yup.object().shape({
    ...generalSchema,
    measurementsAndWeight: Yup.object().shape({
        weight: Yup.number().required("El Peso de la mascota es requerido"),
        height: Yup.number().required("El alto de la mascota es requerido"),
        width: Yup.number().required("El ancho de la mascota es requerido"),
        length: Yup.number().required("El largo de la mascota es requerido"),
        updatedAt: Yup.date(),
    }).required("El Peso y las medidas de la mascota es requerido"),
    cageRecommendation: Yup.object().shape({
        modelCage: Yup.string().required("El modelo de la jaula es requerido"),
        dimensionsCage: Yup.string().required("La dimensión de la jaula requerido"),
        typeCage: Yup.string().oneOf(['', ...CAGE_TYPE] as const),
    }).required("la recomendación de la jaula es requerida"),
})


export { defaultValues, petSchema };

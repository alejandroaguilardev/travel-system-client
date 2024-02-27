import * as Yup from 'yup';
import { Cage } from '../../../../../modules/contracts/domain/contract-services/cage/cage';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status';
import { CAGE_TYPE } from '../../../../../modules/cages/domain/cage-type';

export const cageSchema: Yup.ObjectSchema<Cage> = Yup.object().shape({
    status: Yup.string().required('El estado es un campo obligatorio').oneOf(CONTRACT_STATUS.map((status) => status.value)),
    hasServiceIncluded: Yup.boolean().required('Campo requerido'),
    chosen: Yup.object().shape({
        modelCage: Yup.string().required("Debe indicar el modelo de la jaula"),
        dimensionsCage: Yup.string().required("Debe indicar las dimensiones de una jaula"),
        typeCage: Yup.string().oneOf(['', ...CAGE_TYPE] as const).required("Debe indicar el tipo de jaula"),
        user: Yup.string()
    }),
    recommendation: Yup.object().shape({
        modelCage: Yup.string().required("Debe indicar el modelo de la jaula"),
        dimensionsCage: Yup.string().required("Debe indicar las dimensiones de una jaula"),
        typeCage: Yup.string().oneOf(['', ...CAGE_TYPE] as const).required("Debe indicar el tipo de jaula"),
        user: Yup.string()
    }),
});

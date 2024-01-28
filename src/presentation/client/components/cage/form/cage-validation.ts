import * as Yup from 'yup';
import { CageDefinition } from '../../../../../modules/contracts/domain/interfaces/cage';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status';
import { TYPE_CAGE } from '../../../../../modules/contracts/domain/cage/cage-chosen';

export const cageSchema: Yup.ObjectSchema<CageDefinition> = Yup.object().shape({
    status: Yup.string().required('El estado es un campo obligatorio').oneOf(CONTRACT_STATUS.map((status) => status.value)),
    hasServiceIncluded: Yup.boolean().required('Campo requerido'),
    swornDeclaration: Yup.boolean().required('Debe aceptar los términos y condiciones'),
    chosen: Yup.object().shape({
        modelCage: Yup.string().required("Debe indicar el modelo de la jaula"),
        dimensionsCage: Yup.string().required("Debe indicar las dimensiones de una jaula"),
        typeCage: Yup.string().oneOf(['', ...TYPE_CAGE] as const).required("Debe indicar el tipo de jaula"),
    }),
    recommendation: Yup.string(),
});

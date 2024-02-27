import * as Yup from 'yup';
import { NewContract } from '../../../../modules/contracts/domain/contract';


const defaultValues: NewContract = {
    id: '',
    client: '',
    number: '',
    startDate: new Date(),
    details: []

};

const contractSchema: Yup.ObjectSchema<NewContract> = Yup.object().shape({
    id: Yup.string(),
    client: Yup.string().required('El cliente es requerido'),
    number: Yup.string().required('El número de contrato es requerido'),
    startDate: Yup.date().required('La fecha de inicio es requerida'),
    details: Yup.array().required('Los detalles del contrato son requeridos'),
});

export { defaultValues, contractSchema };

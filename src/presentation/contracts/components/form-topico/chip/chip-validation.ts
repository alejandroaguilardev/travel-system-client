import * as Yup from 'yup';
import { ChipContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';



export const defaultChip = {
    hasIncluded: false,
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    user: '',

};

export const chipObjectSchema: Yup.ObjectSchema<ChipContract> = Yup.object().shape({
    hasIncluded: Yup.boolean(),
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string().required("El microchip es requerido"),
    observation: Yup.string(),
    user: Yup.string(),
});

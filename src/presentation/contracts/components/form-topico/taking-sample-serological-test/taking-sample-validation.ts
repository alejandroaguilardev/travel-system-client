import * as Yup from 'yup';
import { TakingSampleSerologicalTestContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const defaultTakingSampleSerologicalTestContract: TakingSampleSerologicalTestContract = {
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    user: '',
};

export const takingSampleContractObjectSchema: Yup.ObjectSchema<TakingSampleSerologicalTestContract> = Yup.object().shape({
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string(),
    observation: Yup.string(),
    user: Yup.string(),
});

import * as Yup from 'yup';
import { TakingSampleSerologicalTestContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const defaultTakingSampleSerologicalTestContract: TakingSampleSerologicalTestContract = {
    hasIncluded: false,
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    typeSample: 'PR',
    user: '',
};

export const takingSampleContractObjectSchema: Yup.ObjectSchema<TakingSampleSerologicalTestContract> = Yup.object().shape({
    hasIncluded: Yup.boolean(),
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string(),
    observation: Yup.string(),
    typeSample: Yup.string(),
    user: Yup.string(),
});

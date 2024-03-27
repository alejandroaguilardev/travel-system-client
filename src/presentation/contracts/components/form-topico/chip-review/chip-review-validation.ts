import * as Yup from 'yup';
import { ChipReviewContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const defaultChipReview: ChipReviewContract = {
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    user: '',
};

export const chipReviewContractObjectSchema: Yup.ObjectSchema<ChipReviewContract> = Yup.object().shape({
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string(),
    observation: Yup.string(),
    user: Yup.string(),
});

import * as Yup from 'yup';
import { RabiesVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const defaultRabiesVaccination: RabiesVaccinationContract = {
    hasIncluded: false,
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    user: '',
};

export const rabiesVaccinationContractObjectSchema: Yup.ObjectSchema<RabiesVaccinationContract> = Yup.object().shape({
    hasIncluded: Yup.boolean(),
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string(),
    observation: Yup.string(),
    user: Yup.string(),
});

import * as Yup from 'yup';
import { RabiesReVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const defaultRabiesReVaccination: RabiesReVaccinationContract = {
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    user: '',
};

export const rabiesReVaccinationContractObjectSchema: Yup.ObjectSchema<RabiesReVaccinationContract> = Yup.object().shape({
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string(),
    observation: Yup.string(),
    user: Yup.string(),
});

import * as Yup from 'yup';
import { RabiesReVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const defaultRabiesReVaccination: RabiesReVaccinationContract = {
    hasIncluded: false,
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    doctorProvince: '',
    user: '',
};

export const rabiesReVaccinationContractObjectSchema: Yup.ObjectSchema<RabiesReVaccinationContract> = Yup.object().shape({
    hasIncluded: Yup.boolean(),
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string(),
    observation: Yup.string(),
    doctorProvince: Yup.string(),
    user: Yup.string(),
});

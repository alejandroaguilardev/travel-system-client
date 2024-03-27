import * as Yup from 'yup';
import { VaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const defaultVaccination: VaccinationContract = {
    hasIncluded: false,
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    user: '',
};

export const vaccinationContractObjectSchema: Yup.ObjectSchema<VaccinationContract> = Yup.object().shape({
    hasIncluded: Yup.boolean(),
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string().required("La vacuna es requerido"),
    observation: Yup.string(),
    user: Yup.string(),
});

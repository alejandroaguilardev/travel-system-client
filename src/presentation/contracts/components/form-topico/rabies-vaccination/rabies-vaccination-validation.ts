import * as Yup from 'yup';
import { RabiesVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';

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


export const petRabiesVaccinationDefaultValues = (detail: ContractDetail) => {
    const rabiesVaccination = detail?.topico?.rabiesVaccination;
    const dataExits = detail?.pet?.topico?.rabiesVaccination;

    if (rabiesVaccination?.date) {
        return {
            hasIncluded: rabiesVaccination?.hasIncluded || defaultRabiesVaccination.hasIncluded,
            executed: rabiesVaccination?.executed || defaultRabiesVaccination.executed,
            date: rabiesVaccination?.date || defaultRabiesVaccination.date,
            description: rabiesVaccination?.description || defaultRabiesVaccination.description,
            observation: rabiesVaccination?.observation || defaultRabiesVaccination.observation,
            user: rabiesVaccination?.user || defaultRabiesVaccination.user
        }
    }

    if (dataExits?.date) {
        return {
            hasIncluded: detail.documentation.vaccinationCertificate?.hasServiceIncluded || defaultRabiesVaccination.hasIncluded,
            executed: dataExits?.executed || defaultRabiesVaccination.executed,
            date: dataExits?.date || defaultRabiesVaccination.date,
            description: dataExits?.description || defaultRabiesVaccination.description,
            observation: dataExits?.observation || defaultRabiesVaccination.observation,
            user: dataExits?.user || defaultRabiesVaccination.user
        }
    }
    return defaultRabiesVaccination;
}


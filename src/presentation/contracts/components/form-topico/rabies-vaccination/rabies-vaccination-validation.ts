import * as Yup from 'yup';
import { RabiesVaccinationContract, hasIncludedServiceTopico } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { Contract } from '../../../../../modules/contracts/domain/contract';

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


export const petRabiesVaccinationDefaultValues = (contract: Contract, detail: ContractDetail) => {
    const rabiesVaccination = detail?.topico?.rabiesVaccination;
    const dataExits = detail?.pet?.topico?.rabiesVaccination;

    if (hasIncludedServiceTopico(contract, detail, "rabiesVaccination", "rabiesSeroLogicalTest")) {
        return {
            hasIncluded: rabiesVaccination?.hasIncluded || defaultRabiesVaccination.hasIncluded,
            executed: rabiesVaccination?.executed || defaultRabiesVaccination.executed,
            date: rabiesVaccination?.date || defaultRabiesVaccination.date,
            description: rabiesVaccination?.description || defaultRabiesVaccination.description,
            observation: rabiesVaccination?.observation || defaultRabiesVaccination.observation,
            user: rabiesVaccination?.user || defaultRabiesVaccination.user
        }
    }

    const detailDataExits = { ...detail, topico: detail?.pet?.topico } as ContractDetail;
    if (hasIncludedServiceTopico(contract, detailDataExits, "rabiesVaccination", "rabiesSeroLogicalTest")) {
        return {
            hasIncluded: detail.topico?.rabiesVaccination?.hasIncluded || defaultRabiesVaccination.hasIncluded,
            executed: dataExits?.executed || defaultRabiesVaccination.executed,
            date: dataExits?.date || defaultRabiesVaccination.date,
            description: dataExits?.description || defaultRabiesVaccination.description,
            observation: dataExits?.observation || defaultRabiesVaccination.observation,
            user: dataExits?.user || defaultRabiesVaccination.user
        }
    }
    return defaultRabiesVaccination;
}


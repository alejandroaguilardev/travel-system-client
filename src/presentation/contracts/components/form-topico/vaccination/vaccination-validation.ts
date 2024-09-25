import * as Yup from 'yup';
import { VaccinationContract, hasIncludedServiceTopico } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { Contract } from '../../../../../modules/contracts/domain/contract';

export const defaultVaccination: VaccinationContract = {
    hasIncluded: false,
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    doctorProvince: '',
    user: '',
};

export const vaccinationContractObjectSchema: Yup.ObjectSchema<VaccinationContract> = Yup.object().shape({
    hasIncluded: Yup.boolean(),
    executed: Yup.boolean(),
    date: Yup.date(),
    description: Yup.string(),
    observation: Yup.string(),
    doctorProvince: Yup.string(),
    user: Yup.string(),
});


export const vaccinationType = (type?: string): string => {
    if (type?.toLowerCase() === "canino") {
        return "Distemper, Parvovirosis, Leptospirosis, Parainfluenza, Adenovirus"
    }
    if (type?.toLowerCase() === "felino") {
        return "Rinotraqueitis, panleucopenia, calicivirus";
    }
    return type ?? "";
}



export const petVaccinationDefaultValues = (contract: Contract, detail: ContractDetail) => {
    const vaccination = detail?.topico?.vaccination;
    const dataExits = detail?.pet?.topico?.vaccination;
    const isIncluded = hasIncludedServiceTopico(contract, detail, "vaccination", "vaccinationCertificate")
    if (isIncluded) {
        defaultVaccination.description = vaccinationType(detail.pet?.type);
    }

    if (isIncluded) {
        return {
            hasIncluded: detail?.topico?.vaccination?.hasIncluded || defaultVaccination.hasIncluded,
            executed: vaccination?.executed || defaultVaccination.executed,
            date: vaccination?.date || defaultVaccination.date,
            description: vaccination?.description || vaccinationType(detail.pet?.type),
            observation: vaccination?.observation || defaultVaccination.observation,
            doctorProvince: vaccination?.doctorProvince || defaultVaccination.doctorProvince,
            user: vaccination?.user || defaultVaccination.user
        }
    }

    const detailDataExits = { ...detail, topico: detail?.pet?.topico } as ContractDetail;
    if (hasIncludedServiceTopico(contract, detailDataExits, "vaccination", "vaccinationCertificate")) {
        return {
            hasIncluded: detail?.topico?.vaccination?.hasIncluded || defaultVaccination.hasIncluded,
            executed: dataExits?.executed || defaultVaccination.executed,
            date: dataExits?.date || defaultVaccination.date,
            description: dataExits?.description || vaccinationType(detail.pet?.type),
            observation: dataExits?.observation || defaultVaccination.observation,
            doctorProvince: defaultVaccination.doctorProvince,
            user: dataExits?.user || defaultVaccination.user
        }
    }
    return defaultVaccination;
}
import * as Yup from 'yup';
import { VaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';

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
    description: Yup.string(),
    observation: Yup.string(),
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



export const petVaccinationDefaultValues = (detail: ContractDetail) => {
    const vaccination = detail?.topico?.vaccination;
    const dataExits = detail?.pet?.topico?.vaccination;

    if (detail.documentation.vaccinationCertificate?.hasServiceIncluded) {
        defaultVaccination.description = vaccinationType(detail.pet?.type);
    }

    if (vaccination?.date) {
        return {
            hasIncluded: detail.documentation.vaccinationCertificate?.hasServiceIncluded || defaultVaccination.hasIncluded,
            executed: vaccination?.executed || defaultVaccination.executed,
            date: vaccination?.date || defaultVaccination.date,
            description: vaccination?.description || vaccinationType(detail.pet?.type),
            observation: vaccination?.observation || defaultVaccination.observation,
            user: vaccination?.user || defaultVaccination.user
        }
    }

    if (dataExits?.date) {
        return {
            hasIncluded: detail.documentation.vaccinationCertificate?.hasServiceIncluded || defaultVaccination.hasIncluded,
            executed: dataExits?.executed || defaultVaccination.executed,
            date: dataExits?.date || defaultVaccination.date,
            description: dataExits?.description || vaccinationType(detail.pet?.type),
            observation: dataExits?.observation || defaultVaccination.observation,
            user: dataExits?.user || defaultVaccination.user
        }
    }
    return defaultVaccination;
}
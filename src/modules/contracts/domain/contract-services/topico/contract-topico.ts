import dayjs from "dayjs";
import { Contract } from "../../contract";
import { DOCUMENTATION_KEYS } from "../documentation/documentation";

export interface ChipContract {
    hasIncluded?: boolean;
    executed?: boolean;
    date?: Date;
    description?: string;
    observation?: string;
    user?: string;
}

export interface VaccinationContract {
    hasIncluded?: boolean;
    executed?: boolean;
    date?: Date;
    description?: string;
    observation?: string;
    user?: string;
}

export interface RabiesVaccinationContract {
    hasIncluded?: boolean;
    executed?: boolean;
    date?: Date;
    description?: string;
    observation?: string;
    user?: string;
}

export interface RabiesReVaccinationContract {
    hasIncluded?: boolean;
    executed?: boolean;
    date?: Date;
    description?: string;
    observation?: string;
    user?: string;
}

export interface ChipReviewContract {
    hasIncluded?: boolean;
    executed?: boolean;
    date?: Date;
    description?: string;
    observation?: string;
    user?: string;
}

export interface TakingSampleSerologicalTestContract {
    hasIncluded?: boolean;
    executed?: boolean;
    typeSample?: string;
    date?: Date;
    description?: string;
    observation?: string;
    user?: string;
}


export interface ContractTopico {
    chip: ChipContract;
    vaccination: VaccinationContract;
    rabiesVaccination: RabiesVaccinationContract;
    rabiesReVaccination: RabiesReVaccinationContract;
    chipReview: ChipReviewContract;
    takingSampleSerologicalTest: TakingSampleSerologicalTestContract;
}

export const TOPICO_KEYS = {
    chip: "chip",
    vaccination: "vaccination",
    rabiesVaccination: "rabiesVaccination",
    rabiesReVaccination: "rabiesReVaccination",
    chipReview: "chipReview",
    takingSampleSerologicalTest: "takingSampleSerologicalTest"
};


export const hasShowReviewChip = (topico?: ContractTopico): boolean => {

    if (((topico?.rabiesReVaccination?.hasIncluded || topico?.rabiesReVaccination?.executed)
        || (topico?.rabiesVaccination?.hasIncluded || topico?.rabiesVaccination?.executed))
        && (topico?.takingSampleSerologicalTest?.hasIncluded || topico?.takingSampleSerologicalTest?.executed)
    ) {
        return true;
    }
    return false;
}

const dateTopicoUpdateSeparate = dayjs('2024-09-14');

export const hasIncludedServiceTopico = (service: any): boolean => {
    return service?.hasIncluded || service?.executed;
}

export const hasIncludedServiceTopicoManyPets = (contract: Contract, topicoKey: keyof typeof TOPICO_KEYS, documentationKey: keyof typeof DOCUMENTATION_KEYS): boolean => {
    if (dateTopicoUpdateSeparate.isAfter(dayjs(contract.startDate))) {
        const value = contract.details.filter(_ => _.documentation?.[documentationKey]?.hasServiceIncluded);
        return value?.length > 0;
    }

    const value = contract.details.filter((_) => _?.topico?.[topicoKey]?.hasIncluded);
    return value?.length > 0;
}
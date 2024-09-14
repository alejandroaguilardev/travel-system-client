import { Contract } from "../../contract";
import { ContractDetail } from "../../contract-detail";
import { DOCUMENTATION_KEYS } from "../documentation/documentation";
import { CONSTANTS } from '../../../../../app/config/constants';

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


export const hasShowReviewChip = (contract: Contract, detail: ContractDetail): boolean => {
    if (CONSTANTS.TOPICO_UPDATE_CUT_OFF_DATE.getTime() > new Date(contract.startDate).getTime()) {
        return detail?.documentation?.chipCertificate?.hasServiceIncluded
    }

    if (((detail?.topico?.rabiesReVaccination?.hasIncluded || detail?.topico?.rabiesReVaccination?.executed)
        || (detail?.topico?.rabiesVaccination?.hasIncluded || detail?.topico?.rabiesVaccination?.executed))
        && (detail?.topico?.takingSampleSerologicalTest?.hasIncluded || detail?.topico?.takingSampleSerologicalTest?.executed)
    ) {
        return true;
    }
    return false;
}


export const hasIncludedServiceTopico = (contract: Contract, detail: ContractDetail, topicoKey: keyof typeof TOPICO_KEYS, documentationKey: keyof typeof DOCUMENTATION_KEYS): boolean => {
    if (CONSTANTS.TOPICO_UPDATE_CUT_OFF_DATE.getTime() > new Date(contract.startDate).getTime()) {
        return detail?.documentation?.[documentationKey]?.hasServiceIncluded
    }
    return !!(detail?.topico?.[topicoKey]?.hasIncluded || detail?.topico?.[topicoKey]?.executed);
}

export const hasIncludedServiceTopicoManyPets = (contract: Contract, topicoKey: keyof typeof TOPICO_KEYS, documentationKey: keyof typeof DOCUMENTATION_KEYS): boolean => {
    if (CONSTANTS.TOPICO_UPDATE_CUT_OFF_DATE.getTime() > new Date(contract.startDate).getTime()) {
        const value = contract.details.filter(_ => _.documentation?.[documentationKey]?.hasServiceIncluded);
        return value?.length > 0;
    }

    const value = contract.details.filter((_) => _?.topico?.[topicoKey]?.hasIncluded);
    return value?.length > 0;
}


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

    if ((topico?.rabiesReVaccination?.hasIncluded
        || topico?.rabiesVaccination?.hasIncluded)
        && topico?.takingSampleSerologicalTest?.hasIncluded
    ) {
        return true;
    }
    return false;
}
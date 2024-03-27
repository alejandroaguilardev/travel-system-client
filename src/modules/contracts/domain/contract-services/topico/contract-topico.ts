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
    executed?: boolean;
    date?: Date;
    description?: string;
    observation?: string;
    user?: string;
}

export interface ChipReviewContract {
    executed?: boolean;
    date?: Date;
    description?: string;
    observation?: string;
    user?: string;
}

export interface TakingSampleSerologicalTestContract {
    executed?: boolean;
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

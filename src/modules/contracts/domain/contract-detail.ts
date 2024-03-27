import { Cage } from "./contract-services/cage/cage";
import { Documentation } from "./contract-services/documentation/documentation";
import { Travel, TypeTraveling } from "./contract-services/travel/contract-travel";
import { Pet } from '../../pets/domain/pet';
import { ContractTopico } from "./contract-services/topico/contract-topico";


export interface ContractPetUpdater {
    id: string;
    pet: string,
}

export interface ContractDetail {
    id: string;
    documentation: Documentation;
    cage: Cage;
    travel: Travel;
    topico?: ContractTopico;
    guideNumber?: string;
    pet?: Pet;
    user?: string;
}

export interface NewContractDetail extends Omit<ContractDetail, "id" | "guideNumber" | "guideNumber" | "travel" | "cage" | "pet"> {
    id?: string;
    cage?: Cage;
    travel: {
        hasServiceIncluded: boolean,
        hasServiceAccompanied: boolean;
        typeTraveling: TypeTraveling;
    }
    pet?: Pet;

}
export interface NewPostContractDetail extends Omit<NewContractDetail, "pet"> {
    pet?: string;
}
import { Cage } from "./contract-services/cage/cage";
import { Documentation } from "./contract-services/documentation/documentation";
import { TypeTraveling } from "./contract-services/travel/contract-travel";
import { Travel } from "./contract-services/travel/travel";
import { Pet } from '../../pets/domain/pet';


export interface ContractDetail {
    id: string;
    documentation: Documentation;
    cage: Cage;
    travel: Travel;
    guideNumber?: string;
    pet: Pet;
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
    pet: Pet;

}
export interface NewPostContractDetail extends Omit<NewContractDetail, "pet"> {
    pet: string;
}
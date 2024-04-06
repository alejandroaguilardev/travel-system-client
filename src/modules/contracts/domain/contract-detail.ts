import { Cage } from "./contract-services/cage/cage";
import { Documentation } from "./contract-services/documentation/documentation";
import { Travel } from "./contract-services/travel/contract-travel";
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

export interface NewContractDetail extends Omit<ContractDetail, "id"> {
    id?: string;
}
export interface NewPostContractDetail extends Omit<NewContractDetail, "pet"> {
    pet?: string;
}
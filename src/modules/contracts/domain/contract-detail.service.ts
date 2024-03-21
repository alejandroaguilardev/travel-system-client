import { Contract } from './contract';
import { ContractDetail, ContractPetUpdater } from './contract-detail';
import { Criteria } from '../../shared/domain/criteria/criteria';
import { ResponseSearch } from '../../shared/domain/response/response-search';
import { Documentation } from './contract-services/documentation/documentation';
import { Cage } from './contract-services/cage/cage';
import { PartialTravel } from './contract-services/travel/contract-travel';
import { TravelPetPerCharge } from './contract-services/travel/travel-pet-per-charge';
import { TravelAccompaniedPet } from './contract-services/travel/travel-accompanied-pet';
import { TravelDestination } from './contract-services/travel/travel-destination';
import { ResponseSuccess } from '../../shared/domain/response/response-success';
import { ContractTopico } from './contract-services/topico/contract-topico';

export type ContractDetailUpdateResponse = {
    contract: Contract,
    contractDetail: ContractDetail
}

export interface ContractDetailService {
    search(criteria: Criteria): Promise<ResponseSearch<ContractDetail[]>>;
    searchById(contractId: string, contractDetailId: string): Promise<ContractDetail>;
    updateTopico(contractId: string, detailId: string, body: ContractTopico): Promise<ContractDetailUpdateResponse>;
    updateDocumentation(contractId: string, detailId: string, body: Documentation): Promise<ContractDetailUpdateResponse>;
    updateCage(contractId: string, detailId: string, body: Cage): Promise<ContractDetailUpdateResponse>;
    updateTravel(contractId: string, detailId: string, body: PartialTravel): Promise<ContractDetailUpdateResponse>;
    updateAccompaniedPet(
        contractId: string,
        detailId: string,
        accompaniedPet: TravelAccompaniedPet,
        destination: TravelDestination,
        petPerCharge: TravelPetPerCharge
    ): Promise<ContractDetailUpdateResponse>;
    updatePet(contractId: string, details: ContractPetUpdater[]): Promise<ResponseSuccess>;
}

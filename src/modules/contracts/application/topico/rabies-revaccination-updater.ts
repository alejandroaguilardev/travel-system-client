import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { TOPICO_KEYS, RabiesReVaccinationContract } from '../../domain/contract-services/topico/contract-topico';


export const contractRabiesReVaccinationUpdater = (contractDetailService: ContractDetailService) => async (contractId: string, detailId: string, rabiesReVaccination: RabiesReVaccinationContract): Promise<ContractDetailUpdateResponse> => {
    rabiesReVaccination.executed = true;

    const response = await contractDetailService.updateTopico(contractId, detailId, TOPICO_KEYS.rabiesReVaccination, { rabiesReVaccination });
    return response;
}
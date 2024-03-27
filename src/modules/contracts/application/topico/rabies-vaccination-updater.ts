import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { TOPICO_KEYS, RabiesVaccinationContract } from '../../domain/contract-services/topico/contract-topico';


export const contractRabiesVaccinationUpdater = (contractDetailService: ContractDetailService) => async (contractId: string, detailId: string, rabiesVaccination: RabiesVaccinationContract): Promise<ContractDetailUpdateResponse> => {


    rabiesVaccination.executed = true;

    const response = await contractDetailService.updateTopico(contractId, detailId, TOPICO_KEYS.rabiesVaccination, { rabiesVaccination });
    return response;
}
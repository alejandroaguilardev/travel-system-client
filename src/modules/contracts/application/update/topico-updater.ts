import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { ContractTopico } from '../../domain/contract-services/topico/contract-topico';


export const contractTopicoUpdater = (contractDetailService: ContractDetailService) => async (contractId: string, detailId: string, topico: ContractTopico): Promise<ContractDetailUpdateResponse> => {


    const response = await contractDetailService.updateTopico(contractId, detailId, topico);
    return response;
}
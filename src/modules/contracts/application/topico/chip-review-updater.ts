import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { TOPICO_KEYS, ChipReviewContract } from '../../domain/contract-services/topico/contract-topico';


export const contractChipReviewUpdater = (contractDetailService: ContractDetailService) => async (contractId: string, detailId: string, chipReview: ChipReviewContract): Promise<ContractDetailUpdateResponse> => {
    chipReview.executed = true;

    const response = await contractDetailService.updateTopico(contractId, detailId, TOPICO_KEYS.chipReview, { chipReview });
    return response;
}
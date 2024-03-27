import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { TOPICO_KEYS, TakingSampleSerologicalTestContract } from '../../domain/contract-services/topico/contract-topico';


export const contractTakingSampleUpdater = (contractDetailService: ContractDetailService) => async (contractId: string, detailId: string, takingSampleSerologicalTest: TakingSampleSerologicalTestContract): Promise<ContractDetailUpdateResponse> => {
    takingSampleSerologicalTest.executed = true;

    const response = await contractDetailService.updateTopico(contractId, detailId, TOPICO_KEYS.takingSampleSerologicalTest, { takingSampleSerologicalTest });
    return response;
}
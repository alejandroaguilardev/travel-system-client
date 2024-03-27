import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { TOPICO_KEYS, VaccinationContract } from '../../domain/contract-services/topico/contract-topico';


export const contractVaccinationUpdater = (contractDetailService: ContractDetailService) => async (contractId: string, detailId: string, vaccination: VaccinationContract): Promise<ContractDetailUpdateResponse> => {
    vaccination.executed = true;

    const response = await contractDetailService.updateTopico(contractId, detailId, TOPICO_KEYS.vaccination, { vaccination });
    return response;
}
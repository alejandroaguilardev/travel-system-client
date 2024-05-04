import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { ChipContract, TOPICO_KEYS } from '../../domain/contract-services/topico/contract-topico';
import { PetService } from '../../../pets/domain/pet.service';


export const contractChipUpdater = (contractDetailService: ContractDetailService, petService: PetService) => async (contractId: string, detailId: string, petId: string, chip: ChipContract): Promise<ContractDetailUpdateResponse> => {

    await petService.updateChip(petId, chip.description!, chip.date!);
    const response = await contractDetailService.updateTopico(contractId, detailId, TOPICO_KEYS.chip, { chip });
    return response;
}
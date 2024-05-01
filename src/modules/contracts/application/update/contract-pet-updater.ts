import { NewPet } from '../../../pets/domain/pet';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ContractDetailService } from '../../domain/contract-detail.service';

export const contractPetUpdater = (contractDetailService: ContractDetailService) => async (contractId: string, detailId: string, petId?: string): Promise<ResponseSuccess> => {

    const data = [
        {
            id: detailId,
            pet: petId ?? ""
        }
    ]

    const response = await contractDetailService.updatePet(contractId, data);
    return response;
}
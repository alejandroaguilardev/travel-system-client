import { NewPet } from '../../../pets/domain/pet';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ContractDetailService } from '../../domain/contract-detail.service';

export interface ContractPetUpdaterInterface {
    id: string;
    pet: NewPet,
}

export const contractPetUpdater = (contractDetailService: ContractDetailService) => async (contractId: string, details: ContractPetUpdaterInterface[]): Promise<ResponseSuccess> => {

    const data = details?.map(_ => ({
        id: _.id,
        pet: _.pet.id ?? ""
    }))

    const response = await contractDetailService.updatePet(contractId, data);
    return response;
}
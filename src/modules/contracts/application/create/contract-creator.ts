import { NewContract, NewPostContract } from '../../domain/contract';
import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const contractCreator = (contractService: ContractService, uuid: UuidService) => async (contract: NewContract): Promise<ResponseSuccess> => {
    contract.id = uuid.generate();
    const newContract: NewPostContract = contractCreatorFormat(contract);


    const response = await contractService.save(newContract);
    return response;
}


export const contractCreatorFormat = (contract: NewContract): NewPostContract => {
    return {
        ...contract,
        details: contract.details.map(detail => {

            return {
                ...detail,
                pet: detail.pet.id,
            }
        })
    }

}
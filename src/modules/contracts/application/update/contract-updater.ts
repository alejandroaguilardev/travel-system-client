import { NewContract, NewPostContract } from '../../domain/contract';
import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const contractUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, contract: NewContract): Promise<ResponseSuccess> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const newContract: NewPostContract = {
        ...contract,
        details: contract.details.map(detail => {

            return {
                ...detail,
                pet: detail.pet.id,
            }
        })
    }

    const response = await contractService.update(contractId, newContract);
    return response;
}
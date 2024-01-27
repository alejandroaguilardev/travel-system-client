import { NewContract } from '../../domain/contract';
import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const contractUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, contract: Partial<NewContract>): Promise<ResponseSuccess> => {

    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }
    const response = await contractService.update(contractId, contract);
    return response;
}
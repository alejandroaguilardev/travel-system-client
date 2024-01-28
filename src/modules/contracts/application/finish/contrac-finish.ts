import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ContractService } from '../../domain/contract.service';

export const contractFinish = (contractService: ContractService, uuid: UuidService) => async (contractId: string): Promise<ResponseSuccess> => {

    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await contractService.finish(contractId);
    return response;
}
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ContractService } from '../../domain/contract.service';

export const contractCancel = (contractService: ContractService, uuid: UuidService) => async (contractId: string, reasonForCancellation: string): Promise<ResponseSuccess> => {

    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await contractService.cancel(contractId, reasonForCancellation);
    return response;
}
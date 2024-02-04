import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ContractService } from '../../domain/contract.service';
import { Contract } from '../../domain/contract';
import { Cage } from '../../domain/contract-services/cage/cage';

export const cageUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, cage: Cage): Promise<Contract> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await contractService.updateCage(contractId, cage);
    return response;
}
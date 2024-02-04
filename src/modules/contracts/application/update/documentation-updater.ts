import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { Documentation } from '../../domain/contract-services/documentation/documentation';
import { Contract } from '../../domain/contract';

export const documentationUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, documentation: Documentation): Promise<Contract> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await contractService.updateDocumentation(contractId, documentation);
    return response;
}
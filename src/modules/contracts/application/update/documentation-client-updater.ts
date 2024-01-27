import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { DocumentationDefinition } from '../../domain/interfaces/documentation';
import { Contract } from '../../domain/contract';

export const documentationClientUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, documentation: DocumentationDefinition): Promise<Contract> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await contractService.updateDocumentationClient(contractId, documentation);
    return response;
}
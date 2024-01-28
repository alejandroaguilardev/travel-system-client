import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ContractService } from '../../domain/contract.service';
import { Contract } from '../../domain/contract';
import { CageDefinition } from '../../domain/interfaces/cage';

export const cageUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, cage: CageDefinition): Promise<Contract> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    if (!cage.swornDeclaration) {
        throw new ErrorInvalidadArgument("Debe aceptar la declaración jurada");
    }

    const response = await contractService.updateCage(contractId, cage);
    return response;
}
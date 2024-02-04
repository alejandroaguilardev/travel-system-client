import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ContractService } from '../../domain/contract.service';
import { Contract } from '../../domain/contract';
import { PartialTravel } from '../../domain/contract-services/travel/travel';

export const travelUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, travel: PartialTravel): Promise<Contract> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await contractService.updateTravel(contractId, travel);
    return response;
}
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { Documentation } from '../../domain/contract-services/documentation/documentation';

export const documentationUpdater = (contractService: ContractDetailService, uuid: UuidService) => async (contractId: string, detailId: string, contractDetail: Documentation): Promise<ContractDetailUpdateResponse> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await contractService.updateDocumentation(contractId, detailId, contractDetail);
    return response;
}
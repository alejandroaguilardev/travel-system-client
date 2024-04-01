import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { Cage } from '../../domain/contract-services/cage/cage';
import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';

export const cageUpdater = (contractService: ContractDetailService, uuid: UuidService) => async (contractId: string, detailId: string, cage: Cage): Promise<ContractDetailUpdateResponse> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const updatedCage: Cage = {
        status: cage.status,
        hasServiceIncluded: cage.hasServiceIncluded,
        chosen: {
            modelCage: cage.chosen.modelCage,
            dimensionsCage: cage.chosen.dimensionsCage,
            typeCage: cage.chosen.typeCage,
        },
        confirmation: cage?.confirmation ?? false,
        petTravelAcquisition: cage?.petTravelAcquisition ?? false,
    }

    const response = await contractService.updateCage(contractId, detailId, updatedCage);
    return response;
}
import { Cage } from '../../domain/cage';
import { CageService } from '../../domain/cage.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const cageUpdater = (cageService: CageService, uuid: UuidService) => async (cageId: string, cage: Partial<Cage>): Promise<ResponseSuccess> => {

    if (!uuid.validate(cageId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }
    const response = await cageService.update(cageId, cage);
    return response;
}
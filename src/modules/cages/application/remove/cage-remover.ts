import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { CageService } from '../../domain/cage.service';

export const cageRemover = (cageService: CageService, uuid: UuidService) => async (cageId: string): Promise<ResponseSuccess> => {

    if (!uuid.validate(cageId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await cageService.remove(cageId);
    return response;
}
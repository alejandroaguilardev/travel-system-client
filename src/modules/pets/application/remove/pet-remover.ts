import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { PetService } from '../../domain/pet.service';

export const petRemover = (petService: PetService, uuid: UuidService) => async (petId: string): Promise<ResponseSuccess> => {

    if (!uuid.validate(petId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await petService.remove(petId);
    return response;
}
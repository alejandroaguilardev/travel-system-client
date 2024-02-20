import { Pet } from '../../domain/pet';
import { PetService } from '../../domain/pet.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const petUpdater = (petService: PetService, uuid: UuidService) => async (petId: string, pet: Partial<Pet>): Promise<ResponseSuccess> => {

    if (!uuid.validate(petId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    delete pet.status;
    delete pet.user;

    const response = await petService.update(petId, pet);
    return response;
}
import { NewPet, Pet } from '../../domain/pet';
import { PetService } from '../../domain/pet.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const petCreator = (petService: PetService, uuid: UuidService) => async (pet: NewPet): Promise<ResponseSuccess> => {
    pet.id = uuid.generate()!;
    const response = await petService.save(pet as Pet);
    return response;
}
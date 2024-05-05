import { Pet } from '../../domain/pet';
import { PetService } from '../../domain/pet.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const petUpdater = (petService: PetService, uuid: UuidService) => async (petId: string, pet: Pet): Promise<{ response: ResponseSuccess, pet: Pet }> => {

    if (!uuid.validate(petId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const petUpdated = petUpdaterFormat(pet);

    const response = await petService.update(petId, petUpdated);
    return { response, pet: pet as Pet };
}

export const petUpdaterFormat = (pet: Pet): Pet => {
    const petUpdated: Pet = {
        id: pet?.id ?? "",
        name: pet.name,
        race: pet.race,
        gender: pet.gender,
        birthDate: pet.birthDate,
        chip: pet.chip,
        chipDate: pet.chipDate,
        color: pet.color,
        image: pet.image,
        country: pet.country,
        type: pet.type,
        sterilized: pet.sterilized,
        adopter: pet.adopter,
        user: pet.user,
        cageRecommendation: {
            dimensionsCage: pet.cageRecommendation?.dimensionsCage,
            modelCage: pet.cageRecommendation?.modelCage,
            typeCage: pet.cageRecommendation?.typeCage,
        },
        measurementsAndWeight: {
            height: pet.measurementsAndWeight?.height,
            length: pet.measurementsAndWeight?.length,
            weight: pet.measurementsAndWeight?.weight,
            width: pet.measurementsAndWeight?.width,
        },
        isBrachycephalic: pet.isBrachycephalic,
        isPotentiallyDangerous: pet.isPotentiallyDangerous,
    }

    delete petUpdated.user;
    return petUpdated;
}
import { Pet } from '../../domain/pet';
import { PetService } from '../../domain/pet.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { fDateTime } from 'src/modules/shared/infrastructure/helpers/format-time';

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
        topico: pet.topico ? {
            chip: { ...pet.topico.chip, date: new Date() },
            rabiesReVaccination: { ...pet.topico.rabiesReVaccination, date: new Date() },
            rabiesVaccination: { ...pet.topico.rabiesVaccination, date: new Date() },
            takingSampleSerologicalTest: { ...pet.topico.takingSampleSerologicalTest, date: new Date() },
            vaccination: { ...pet.topico.vaccination, date: new Date() },
        } : undefined,
        isPuppy: pet?.isPuppy ?? false
    }
    // topico: pet.topico ? {
    //     chip: { ...pet.topico.chip, date: new Date()) },
    //     chipReview: { ...pet.topico.chipReview, date: new Date(fDateTime(pet.topico?.chipReview.date)) },
    //     rabiesReVaccination: { ...pet.topico.rabiesReVaccination, date: new Date(fDateTime(pet.topico.rabiesReVaccination.date)) },
    //     rabiesVaccination: { ...pet.topico.rabiesVaccination, date: new Date(fDateTime(pet.topico.rabiesVaccination.date)) },
    //     takingSampleSerologicalTest: { ...pet.topico.takingSampleSerologicalTest, date: new Date(fDateTime(pet.topico.takingSampleSerologicalTest.date)) },
    //     vaccination: { ...pet.topico.vaccination, date: new Date(fDateTime(pet.topico.vaccination.date)) },
    // } : undefined
    delete petUpdated.user;
    return petUpdated;
}
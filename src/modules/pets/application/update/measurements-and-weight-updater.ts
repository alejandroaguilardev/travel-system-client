import { TopicoMeasurementsAndWeight } from '../../domain/pet';
import { PetService } from '../../domain/pet.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const measurementsAndWeightUpdater = (petService: PetService, uuid: UuidService) => async (petId: string, body: TopicoMeasurementsAndWeight): Promise<ResponseSuccess> => {

    if (!uuid.validate(petId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await petService.updateMeasurementsAndWeight(petId, body);
    return response;
}
import { NewCage, Cage } from '../../domain/cage';
import { CageService } from '../../domain/cage.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const cageCreator = (cageService: CageService, uuid: UuidService) => async (cage: NewCage): Promise<ResponseSuccess> => {
    cage.id = uuid.generate()!;
    const response = await cageService.save(cage as Cage);
    return response;
}
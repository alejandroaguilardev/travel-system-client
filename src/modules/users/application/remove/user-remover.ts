import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { UserService } from '../../domain/user.service';

export const userRemover = (userService: UserService, uuid: UuidService) => async (userId: string): Promise<ResponseSuccess> => {

    if (!uuid.validate(userId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await userService.remove(userId);
    return response;
}
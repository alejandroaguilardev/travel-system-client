import { NewUser } from '../../domain/user';
import { UserService } from '../../domain/user.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const userUpdater = (userService: UserService, uuid: UuidService) => async (userId: string, user: Partial<NewUser>): Promise<ResponseSuccess> => {

    if (!uuid.validate(userId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    delete user.auth?.lastLogin;
    delete user.auth?.rememberToken;

    const response = await userService.update(userId, user);
    return response;
}
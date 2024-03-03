import { NewUser } from '../../domain/user';
import { UserService } from '../../domain/user.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const userCreator = (userService: UserService, uuid: UuidService) => async (user: NewUser): Promise<{ response: ResponseSuccess, user: NewUser }> => {
    user.id = uuid.generate();

    const response = await userService.save(user);
    return { response, user };
}
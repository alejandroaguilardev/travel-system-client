import { UserService } from '../../domain/user.service';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const userSecurity = (userService: UserService) => async (password: string, newPassword: string): Promise<ResponseSuccess> => {

    const response = await userService.updatePassword(password, newPassword);
    return response;
}
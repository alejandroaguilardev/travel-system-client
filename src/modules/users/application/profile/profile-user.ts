import { UserService } from '../../domain/user.service';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ProfileInterface } from '../../domain/user-profile.interface';

export const userProfile = (userService: UserService) => async (profile: ProfileInterface): Promise<ResponseSuccess> => {

    const response = await userService.updateProfile(profile);
    return response;
}
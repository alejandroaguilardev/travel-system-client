import { ServiceHost } from '../../shared/domain/services/services-host';
import { NewUser } from './user';
import { ResponseSuccess } from '../../shared/domain/response/response-success';
import { ProfileClient, ProfileInterface } from './user-profile.interface';

export interface UserService extends ServiceHost<NewUser> {
    updatePassword(password: string, newPassword: string): Promise<ResponseSuccess>
    updateProfile(profile: ProfileClient): Promise<ResponseSuccess>
}

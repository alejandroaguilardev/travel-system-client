import { endpoints } from '../..//shared/domain/endpoint';
import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { NewUser } from '../domain/user';
import { UserService } from '../domain/user.service';
import { ProfileInterface } from '../domain/user-profile.interface';
import { ResponseSuccess } from '../../shared/domain/response/response-success';

export const userService: UserService = {
    ...servicesHost<NewUser>(axiosInstance, endpoints.users.root),
    async updatePassword(password: string, newPassword: string): Promise<ResponseSuccess> {
        const { data } = await axiosInstance.patch<ResponseSuccess>(`${endpoints.users.root}/change-password`, {
            password,
            newPassword,
        });
        return data;
    },
    async updateProfile(profile: ProfileInterface): Promise<ResponseSuccess> {
        const { data } = await axiosInstance.patch<ResponseSuccess>(`${endpoints.users.root}/profile`, profile);
        return data;
    }
} 
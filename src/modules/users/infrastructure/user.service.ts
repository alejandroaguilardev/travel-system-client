import { endpoints } from '../..//shared/domain/endpoint';
import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { NewUser } from '../domain/user';
import { UserService } from '../domain/user.service';


export const userService: UserService = {
    ...servicesHost<NewUser>(axiosInstance, endpoints.users.root),
} 

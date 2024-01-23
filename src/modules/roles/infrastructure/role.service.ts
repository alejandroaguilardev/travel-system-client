import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { NewRole } from '../domain/role';
import { RoleService } from '../domain/role.service';
import { endpoints } from '../../shared/domain/endpoint';


export const roleService: RoleService = {
    ...servicesHost<NewRole>(axiosInstance, endpoints.roles.root),
} 

import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Permission } from '../domain/permission';
import { PermissionService } from '../domain/permission.service';
import { endpoints } from '../../shared/domain/endpoint';


export const permissionService: PermissionService = {
    ...servicesHost<Permission>(axiosInstance, endpoints.permissions.root),
} 

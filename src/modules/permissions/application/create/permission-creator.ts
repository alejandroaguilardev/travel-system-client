import { NewPermission, Permission } from '../../domain/permission';
import { PermissionService } from '../../domain/permission.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const permissionCreator = (permissionService: PermissionService, uuid: UuidService) => async (permission: NewPermission): Promise<ResponseSuccess> => {
    permission.id = uuid.generate()!;
    const response = await permissionService.save(permission as Permission);
    return response;
}
import { Permission } from '../../domain/permission';
import { PermissionService } from '../../domain/permission.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const permissionUpdater = (permissionService: PermissionService, uuid: UuidService) => async (permissionId: string, permission: Partial<Permission>): Promise<ResponseSuccess> => {

    if (!uuid.validate(permissionId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }
    const response = await permissionService.update(permissionId, permission);
    return response;
}
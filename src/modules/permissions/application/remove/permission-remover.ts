import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { PermissionService } from '../../domain/permission.service';

export const permissionRemover = (permissionService: PermissionService, uuid: UuidService) => async (permissionId: string): Promise<ResponseSuccess> => {

    if (!uuid.validate(permissionId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await permissionService.remove(permissionId);
    return response;
}
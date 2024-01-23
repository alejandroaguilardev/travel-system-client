import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { RoleService } from '../../domain/role.service';

export const roleRemover = (roleService: RoleService, uuid: UuidService) => async (roleId: string): Promise<ResponseSuccess> => {

    if (!uuid.validate(roleId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const response = await roleService.remove(roleId);
    return response;
}
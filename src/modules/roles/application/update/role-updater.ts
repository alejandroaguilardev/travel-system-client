import { NewRole } from '../../domain/role';
import { RoleService } from '../../domain/role.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';

export const roleUpdater = (roleService: RoleService, uuid: UuidService) => async (roleId: string, role: Partial<NewRole>): Promise<ResponseSuccess> => {

    if (!uuid.validate(roleId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }
    const response = await roleService.update(roleId, role);
    return response;
}
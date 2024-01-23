import { NewRole } from '../../domain/role';
import { RoleService } from '../../domain/role.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const roleCreator = (roleService: RoleService, uuid: UuidService) => async (role: NewRole): Promise<ResponseSuccess> => {
    role.id = uuid.generate()!;
    const response = await roleService.save(role);
    return response;
}
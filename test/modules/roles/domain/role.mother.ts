import { Role } from '../../../../src/modules/roles/domain/role';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import { rolePermissionsCreateMother } from './role-permissions.mother';

export const roleCreateMother = (role?: Role): Role => ({
    id: role?.id ?? uuidCreateMother(),
    name: role?.name ?? stringCreateMother({ count: { min: 1, max: 1 } }),
    description: role?.description ?? stringCreateMother({ count: { min: 1, max: 12 } }),
    permissions: role?.permissions ?? rolePermissionsCreateMother(),
})
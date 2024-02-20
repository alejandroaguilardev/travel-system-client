import { Permission } from '../../../../src/modules/permissions/domain/permission';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';

export const permissionCreateMother = (permission?: Partial<Permission>): Permission => ({
    id: permission?.id ?? uuidCreateMother(),
    name: permission?.name ?? stringCreateMother({ count: { min: 1, max: 1 } }),
    group: permission?.group ?? stringCreateMother({ count: { min: 1, max: 1 } }),
    description: permission?.description ?? stringCreateMother({ count: { min: 1, max: 12 } }),
})
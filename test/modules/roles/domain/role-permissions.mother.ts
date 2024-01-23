import { getRandomInteger } from '../../../../src/modules/shared/domain/helpers/random-number';
import { Permission } from '../../../../src/modules/permissions/domain/permission';
import { permissionCreateMother } from '..//../permissions/domain/permission.mother';



export const rolePermissionsCreateMother = (): Permission[] => {
    const rand = getRandomInteger({ max: 10 });

    return Array(rand).map(_ => permissionCreateMother());
}



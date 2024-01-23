import { getRandomInteger } from '../../../../src/modules/shared/domain/helpers/random-number';
import { Role } from '../../../../src/modules/roles/domain/role';
import { roleCreateMother } from '../../roles/domain/role.mother';



export const userRolesCreateMother = (): Role[] => {
    const rand = getRandomInteger({ max: 10 });

    return Array(rand).map(_ => roleCreateMother());
}



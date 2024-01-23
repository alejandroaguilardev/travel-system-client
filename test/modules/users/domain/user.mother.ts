
import { User } from '../../../../src/modules/users/domain/user';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { firstNameCreateMother } from './first-name.mother';
import { lastNameCreateMother } from './last-name.mother';
import { emailCreateMother } from '../../shared/domain/email.mother';
import { userRolesCreateMother } from './roles-user.mother';

export const userCreateMother = (newUser?: Partial<User>): User => {
    const {
        id,
        name,
        secondName,
        lastName,
        secondLastName,
        email,
        roles,
    } = newUser ?? {};
    return {
        id: id ?? uuidCreateMother(),
        name: name ?? firstNameCreateMother(),
        secondName: secondName ?? firstNameCreateMother(),
        lastName: lastName ?? lastNameCreateMother(),
        secondLastName: secondLastName ?? lastNameCreateMother(),
        email: email ?? emailCreateMother(),
        roles: roles ?? userRolesCreateMother(),

    };
}


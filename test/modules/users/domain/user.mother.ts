import { User } from '../../../../src/modules/users/domain/user';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { emailCreateMother } from '../../shared/domain/email.mother';
import { userRolesCreateMother } from './roles-user.mother';
import { StatusMother } from '../../shared/domain/status-mother';
import { UserAuthMother } from './user-auth.mother';
import { userProfileMother } from './user-profile.mother';

export const userCreateMother = (newUser?: Partial<User>): User => {

    return {
        id: newUser?.id ?? uuidCreateMother(),
        email: newUser?.email ?? emailCreateMother(),
        roles: newUser?.roles ?? userRolesCreateMother(),
        status: newUser?.status ?? StatusMother(),
        user: newUser?.user ?? uuidCreateMother(),
        profile: userProfileMother(newUser?.profile),
        auth: UserAuthMother(newUser?.auth),


    };
}


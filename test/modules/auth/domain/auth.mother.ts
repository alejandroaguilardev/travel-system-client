
import { emailCreateMother } from '../../shared/domain/email.mother';
import { passwordCreatedMother } from '../../users/domain/password.mother';

export const authCreateMother = (email?: string, password?: string) => ({
    email: email ?? emailCreateMother(),
    password: password ?? passwordCreatedMother(),
})



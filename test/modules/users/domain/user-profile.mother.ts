import { faker } from '@faker-js/faker';
import { ProfileInterface } from '../../../../src/modules/users/domain/user-profile.interface';
import { firstNameCreateMother } from './first-name.mother';
import { lastNameCreateMother } from './last-name.mother';
import { phoneMother } from '../../shared/domain/phone.mother';
import { PROFILE_DOCUMENT } from '../../../../src/modules/users/domain/profile/profile-document';

export const userProfileMother = (profile?: ProfileInterface): ProfileInterface => ({
    document: profile?.document ?? PROFILE_DOCUMENT[faker.number.int({ min: 0, max: 3 })],
    documentNumber: profile?.documentNumber ?? faker.number.int({ min: 100000000, max: 1000000000 }).toString(),
    name: profile?.name ?? firstNameCreateMother(),
    secondName: profile?.secondName ?? firstNameCreateMother(),
    lastName: profile?.lastName ?? lastNameCreateMother(),
    secondLastName: profile?.secondLastName ?? lastNameCreateMother(),
    phone: profile?.phone ?? phoneMother(),
    gender: profile?.gender ?? faker.person.sexType(),
    birthDate: profile?.birthDate ?? faker.date.past(),
    department: profile?.department ?? faker.number.int({ min: 10, max: 99 }).toString(),
    province: profile?.province ?? faker.number.int({ min: 1000, max: 9999 }).toString(),
    district: profile?.district ?? faker.number.int({ min: 100000, max: 999999 }).toString(),
    direction: profile?.direction ?? faker.location.direction(),
})
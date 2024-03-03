import { faker } from "@faker-js/faker";
import { UserAuthInterface } from "src/modules/users/domain/user-auth.interface";

export const UserAuthMother = (auth?: UserAuthInterface): UserAuthInterface => ({
    admin: auth?.admin ?? faker.datatype.boolean(),
    lastLogin: auth?.lastLogin ?? faker.date.recent(),
    rememberToken: auth?.rememberToken ?? faker.string.alphanumeric()
})
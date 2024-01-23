import { faker } from '@faker-js/faker';

export const numberCreateMother = (): string => faker.number.bigInt({ min: 1, max: 1000000 }).toString();


import { faker } from '@faker-js/faker';

export const phoneMother = (phone?: string): string => (
    phone ??
    faker.number.int({ min: 1000000000, max: 999999999999 }).toString()
);



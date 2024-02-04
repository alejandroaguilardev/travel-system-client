import { faker } from '@faker-js/faker';

const recent = (): Date => faker.date.recent();
const future = (): Date => faker.date.future();


export const dateMother = {
    recent,
    future
}
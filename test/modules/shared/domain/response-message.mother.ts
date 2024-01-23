import { faker } from "@faker-js/faker";


export const MessageCreateMother = (): string => faker.lorem.paragraph({ min: 1, max: 1 });
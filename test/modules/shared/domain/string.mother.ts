import { faker } from "@faker-js/faker";

type Options = {
    count?: {
        min: number;
        max: number;
    };
};

export const stringCreateMother = (options?: Options): string => faker.word.words(options);
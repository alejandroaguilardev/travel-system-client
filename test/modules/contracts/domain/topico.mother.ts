import { faker } from '@faker-js/faker';
import { ChipContract, ChipReviewContract, ContractTopico, RabiesReVaccinationContract, RabiesVaccinationContract, TakingSampleSerologicalTestContract, VaccinationContract } from '../../../../src/modules/contracts/domain/contract-services/topico/contract-topico';
import { stringCreateMother } from '../../shared/domain/string.mother';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';

export const topicoMother = {

    create: (field: keyof ContractTopico, values?: Partial<ContractTopico>, methodFunction?: () => void): Partial<ContractTopico> => {
        return values ?? {
            [field]: methodFunction && methodFunction()
        };
    },
    chip: (chip?: ChipContract): ChipContract => {
        return chip ?? {
            hasIncluded: faker.datatype.boolean(),
            executed: faker.datatype.boolean(),
            date: faker.date.recent(),
            description: stringCreateMother(),
            observation: stringCreateMother(),
            user: uuidCreateMother(),
        };
    },

    vaccination: (vaccination?: VaccinationContract): ChipContract => {
        return vaccination ?? {
            hasIncluded: faker.datatype.boolean(),
            executed: faker.datatype.boolean(),
            date: faker.date.recent(),
            description: stringCreateMother(),
            observation: stringCreateMother(),
            user: uuidCreateMother(),
        };
    },

    rabiesVaccination: (rabiesVaccination?: RabiesVaccinationContract): RabiesVaccinationContract => {
        return rabiesVaccination ?? {
            hasIncluded: faker.datatype.boolean(),
            executed: faker.datatype.boolean(),
            date: faker.date.recent(),
            description: stringCreateMother(),
            observation: stringCreateMother(),
            user: uuidCreateMother(),
        };
    },

    rabiesReVaccination: (rabiesVaccination?: RabiesReVaccinationContract): RabiesReVaccinationContract => {
        return rabiesVaccination ?? {
            executed: faker.datatype.boolean(),
            date: faker.date.recent(),
            description: stringCreateMother(),
            observation: stringCreateMother(),
            user: uuidCreateMother(),
        };
    },

    chipReview: (chipReview?: ChipReviewContract): ChipReviewContract => {
        return chipReview ?? {
            executed: faker.datatype.boolean(),
            date: faker.date.recent(),
            description: stringCreateMother(),
            observation: stringCreateMother(),
            user: uuidCreateMother(),
        };
    },

    takingSampleSerologicalTest: (takingSampleSerologicalTest?: TakingSampleSerologicalTestContract): TakingSampleSerologicalTestContract => {
        return takingSampleSerologicalTest ?? {
            executed: faker.datatype.boolean(),
            date: faker.date.recent(),
            description: stringCreateMother(),
            observation: stringCreateMother(),
            user: uuidCreateMother(),
        };
    }
}
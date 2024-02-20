import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import { Cage } from 'src/modules/cages/domain/cage';
import { faker } from '@faker-js/faker';
import { CAGE_TYPE } from '../../../../src/modules/cages/domain/cage-type';

const index = faker.datatype.boolean() ? 0 : 1;

export const cageCreateMother = (cage?: Partial<Cage>): Cage => ({
    id: cage?.id ?? uuidCreateMother(),
    dimensionsCage: cage?.dimensionsCage ?? stringCreateMother({ count: { min: 1, max: 1 } }),
    modelCage: cage?.modelCage ?? stringCreateMother({ count: { min: 1, max: 1 } }),
    typeCage: cage?.typeCage ?? CAGE_TYPE[index],
})
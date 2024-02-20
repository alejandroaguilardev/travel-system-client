import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { faker } from '@faker-js/faker';
import { NewPet } from '../../../../src/modules/pets/domain/pet';

export const petCreateMother = (pet?: Partial<NewPet>): NewPet => ({
    id: pet?.id ?? uuidCreateMother(),
    name: pet?.name ?? faker.person.firstName(),
    race: pet?.race ?? faker.animal.dog(),
    gender: pet?.gender ?? faker.person.sexType(),
    birthDate: pet?.birthDate ?? faker.date.past(),
    chip: pet?.chip ?? faker.number.bigInt({ min: 10000000000000, max: 100000000000000 }).toString(),
    chipDate: pet?.chipDate ?? faker.date.recent(),
    color: pet?.color ?? faker.color.human(),
    image: pet?.image ?? faker.internet.url(),
    country: pet?.country ?? faker.location.country(),
    type: pet?.type ?? faker.animal.type(),
    sterilized: pet?.sterilized ?? faker.datatype.boolean() ? "Si" : "No",
})
import { faker } from '@faker-js/faker';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { Folder } from 'src/modules/folders/domain/folder';

export const folderCreateMother = (folder?: Partial<Folder>): Folder => ({
    id: folder?.id ?? uuidCreateMother(),
    name: folder?.name ?? "" + faker.number.int(),
    quantity: folder?.quantity ?? faker.number.int({ min: 1, max: 1000 }),
    user: folder?.user ?? uuidCreateMother(),
})
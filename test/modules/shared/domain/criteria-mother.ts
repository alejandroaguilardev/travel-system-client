import { faker } from '@faker-js/faker';
import { Criteria } from '../../../../src/modules/shared/domain/criteria/criteria';


export const criteriaCreateMother = (criteriaDefault?: Partial<Criteria>): Criteria => ({
  start: criteriaDefault?.start ?? faker.number.int(),
  size: criteriaDefault?.size ?? faker.number.int(),
  filters: criteriaDefault?.filters ?? [],
  sorting: criteriaDefault?.sorting ?? [],
  globalFilter: criteriaDefault?.globalFilter ?? '',
  globalFilterProperties: criteriaDefault?.globalFilterProperties ?? [],
  selectProperties: criteriaDefault?.selectProperties ?? [],
})

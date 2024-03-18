import { contractPrice } from './contract-price.mother';
import { faker } from '@faker-js/faker';
import { PayInInstallment } from '../../../../src/modules/contracts/domain/payment-summary';

export const payInInstallmentsMother = (): PayInInstallment[] => {

    return [
        {
            price: contractPrice(),
            date: faker.date.recent(),
            percentage: faker.number.int({ min: 1, max: 100 })
        }
    ]
}

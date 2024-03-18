import { faker } from '@faker-js/faker';
import { CustomerPayment } from '../../../../src/modules/contracts/domain/customer-payments';
import { contractPrice } from './contract-price.mother';

export const customerPaymentsMother = (): CustomerPayment[] => {

    return [
        {
            price: contractPrice(),
            date: faker.date.recent(),
            method: faker.string.sample()
        }
    ]
}

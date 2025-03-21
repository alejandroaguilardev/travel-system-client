import { faker } from '@faker-js/faker';
import { NewContract } from '../../../../src/modules/contracts/domain/contract';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { contractDetailCreateMother } from './contract-detail.mother';
import { contractPrice } from './contract-price.mother';
import { numberCreateMother } from './number.mother';
import { payInInstallmentsMother } from './pay-in-installments.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';

export const contractCreateMother = (contract?: Partial<NewContract>): NewContract => {

    return {
        client: contract?.client ?? uuidCreateMother(),
        number: contract?.number ?? numberCreateMother(),
        startDate: new Date(),
        estimatedDate: faker.date.future(),
        id: contract?.id ?? uuidCreateMother(),
        details: contract?.details ?? contractDetailCreateMother(),
        adviser: contract?.adviser ?? uuidCreateMother(),
        price: contract?.price ?? contractPrice(),
        folder: contract?.folder,
        payInInstallments: contract?.payInInstallments ?? payInInstallmentsMother(),
        reasonForCancellation: contract?.reasonForCancellation ?? stringCreateMother(),
        format: "Europa",
    };
}

import { NewContract } from '../../../../src/modules/contracts/domain/contract';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { contractDetailCreateMother } from './contract-detail.mother';
import { numberCreateMother } from './number.mother';

export const contractCreateMother = (contract?: Partial<NewContract>): NewContract => {

    return {
        client: contract?.client ?? uuidCreateMother(),
        number: contract?.number ?? numberCreateMother(),
        startDate: new Date(),
        id: contract?.id ?? uuidCreateMother(),
        details: contract?.details ?? contractDetailCreateMother(),
        adviser: contract?.adviser ?? uuidCreateMother(),
    };
}

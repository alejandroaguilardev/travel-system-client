import { faker } from '@faker-js/faker';
import { NewContract } from '../../../../src/modules/contracts/domain/contract';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { numberCreateMother } from './number.mother';
import { contractStatusCreateMother } from './contract-status.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import { chosenCreateMother } from './chosen.mother';
import { typeTravelingCreateMother } from './type-traveling-mother';
import { dateMother } from '../../shared/domain/date.mother';

export const contractCreateMother = (contract?: Partial<NewContract>): NewContract => {

    return {
        client: contract?.client ?? uuidCreateMother(),
        number: contract?.number ?? numberCreateMother(),
        startDate: new Date(),
        pets: contract?.pets ?? [uuidCreateMother(), uuidCreateMother()],
        cage: {
            status: contract?.cage?.status ?? contractStatusCreateMother(),
            hasServiceIncluded: contract?.cage?.hasServiceIncluded ?? faker.datatype.boolean(),
            chosen: contract?.cage?.chosen ?? chosenCreateMother(),
            recommendation: contract?.cage?.recommendation ?? stringCreateMother({ count: { min: 1, max: 1 } })
        },
        documentation: {
            chipCertificate: {
                hasServiceIncluded: contract?.documentation?.chipCertificate?.hasServiceIncluded ?? faker.datatype.boolean(),
                isApplied: contract?.documentation?.chipCertificate?.isApplied ?? faker.datatype.boolean(),
                expectedDate: contract?.documentation?.chipCertificate?.expectedDate ?? dateMother.recent(),
                executionDate: null,
            },
            emotionalSupportCertificate: {
                hasServiceIncluded: contract?.documentation?.emotionalSupportCertificate?.hasServiceIncluded ?? faker.datatype.boolean(),
                isApplied: contract?.documentation?.emotionalSupportCertificate?.isApplied ?? faker.datatype.boolean(),
                expectedDate: contract?.documentation?.emotionalSupportCertificate?.expectedDate ?? dateMother.recent(),
                executionDate: null,
            },
            healthCertificate: {
                hasServiceIncluded: contract?.documentation?.healthCertificate?.hasServiceIncluded ?? faker.datatype.boolean(),
                isApplied: contract?.documentation?.healthCertificate?.isApplied ?? faker.datatype.boolean(),
                expectedDate: contract?.documentation?.healthCertificate?.expectedDate ?? dateMother.recent(),
                executionDate: null,
            },
            importLicense: {
                hasServiceIncluded: contract?.documentation?.importLicense?.hasServiceIncluded ?? faker.datatype.boolean(),
                isApplied: contract?.documentation?.importLicense?.isApplied ?? faker.datatype.boolean(),
                expectedDate: contract?.documentation?.importLicense?.expectedDate ?? dateMother.recent(),
                executionDate: null,
            },
            rabiesSeroLogicalTest: {
                hasServiceIncluded: contract?.documentation?.rabiesSeroLogicalTest?.hasServiceIncluded ?? faker.datatype.boolean(),
                isApplied: contract?.documentation?.rabiesSeroLogicalTest?.isApplied ?? faker.datatype.boolean(),
                expectedDate: contract?.documentation?.rabiesSeroLogicalTest?.expectedDate ?? dateMother.recent(),
                executionDate: null,
            },
            senasaDocuments: {
                hasServiceIncluded: contract?.documentation?.senasaDocuments?.hasServiceIncluded ?? faker.datatype.boolean(),
                isApplied: contract?.documentation?.senasaDocuments?.isApplied ?? faker.datatype.boolean(),
                expectedDate: contract?.documentation?.senasaDocuments?.expectedDate ?? dateMother.recent(),
                executionDate: null,
            },
            vaccinationCertificate: {
                hasServiceIncluded: contract?.documentation?.vaccinationCertificate?.hasServiceIncluded ?? faker.datatype.boolean(),
                isApplied: contract?.documentation?.vaccinationCertificate?.isApplied ?? faker.datatype.boolean(),
                expectedDate: contract?.documentation?.vaccinationCertificate?.expectedDate ?? dateMother.recent(),
                executionDate: null,
            },
            status: contract?.documentation?.status ?? contractStatusCreateMother(),
        },
        travel: {
            hasServiceIncluded: contract?.travel?.hasServiceIncluded ?? faker.datatype.boolean(),
            typeTraveling: contract?.travel?.typeTraveling ?? typeTravelingCreateMother(),
            hasServiceAccompanied: contract?.travel?.hasServiceAccompanied ?? faker.datatype.boolean()
        },
    };
}

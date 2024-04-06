import { faker } from '@faker-js/faker';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { contractStatusCreateMother } from './contract-status.mother';
import { chosenCreateMother } from './chosen.mother';
import { typeTravelingCreateMother } from './type-traveling-mother';
import { dateMother } from '../../shared/domain/date.mother';
import { NewContractDetail } from '../../../../src/modules/contracts/domain/contract-detail';
import { petCreateMother } from '../../pets/domain/pet.mother';
import { Pet } from '../../../../src/modules/pets/domain/pet';

export const contractDetailCreateMother = (details?: NewContractDetail[]): NewContractDetail[] => {
    const detail: NewContractDetail = {
        id: uuidCreateMother(),
        pet: petCreateMother() as Pet,
        cage: {
            status: contractStatusCreateMother(),
            hasServiceIncluded: faker.datatype.boolean(),
            chosen: chosenCreateMother(),
            confirmation: faker.datatype.boolean(),
            petTravelAcquisition: faker.datatype.boolean(),
        },
        documentation: {
            chipCertificate: {
                hasServiceIncluded: faker.datatype.boolean(),
                isApplied: faker.datatype.boolean(),
                isRequired: faker.datatype.boolean(),
                expectedDate: dateMother.recent(),
                executionDate: null,
                resultDate: null,
            },
            emotionalSupportCertificate: {
                hasServiceIncluded: faker.datatype.boolean(),
                isApplied: faker.datatype.boolean(),
                isRequired: faker.datatype.boolean(),
                expectedDate: dateMother.recent(),
                executionDate: null,
                resultDate: null,
            },
            healthCertificate: {
                hasServiceIncluded: faker.datatype.boolean(),
                isApplied: faker.datatype.boolean(),
                isRequired: faker.datatype.boolean(),
                expectedDate: dateMother.recent(),
                executionDate: null,
                resultDate: null,
            },
            importLicense: {
                hasServiceIncluded: faker.datatype.boolean(),
                isApplied: faker.datatype.boolean(),
                isRequired: faker.datatype.boolean(),
                expectedDate: dateMother.recent(),
                executionDate: null,
                resultDate: null,
            },
            rabiesSeroLogicalTest: {
                hasServiceIncluded: faker.datatype.boolean(),
                isApplied: faker.datatype.boolean(),
                isRequired: faker.datatype.boolean(),
                expectedDate: dateMother.recent(),
                executionDate: null,
                resultDate: null,
            },
            senasaDocuments: {
                hasServiceIncluded: faker.datatype.boolean(),
                isApplied: faker.datatype.boolean(),
                isRequired: faker.datatype.boolean(),
                expectedDate: dateMother.recent(),
                executionDate: null,
                resultDate: null,
            },
            vaccinationCertificate: {
                hasServiceIncluded: faker.datatype.boolean(),
                isApplied: faker.datatype.boolean(),
                isRequired: faker.datatype.boolean(),
                expectedDate: dateMother.recent(),
                executionDate: null,
                resultDate: null,
            },
            status: contractStatusCreateMother(),
        },
        travel: {
            status: "pending",
            hasServiceIncluded: faker.datatype.boolean(),
            typeTraveling: typeTravelingCreateMother(),
            hasServiceAccompanied: faker.datatype.boolean(),
            airlineReservation: {
                code: "",
                flightNumber: "",
                departureAirport: "",
                destinationAirport: "",
                departureDate: null,
                arrivalDate: null,
            },
            petPerCharge: {
                name: "",
                document: "",
                documentNumber: "",
                phone: "",
                email: "",
            },
            accompaniedPet: {
                name: "",
                document: "",
                documentNumber: "",
                phone: "",
                email: "",
                direction: "",
                district: "",
                province: "",
                department: "",
            },
            destination: {
                countryDestination: "",
                cityDestination: "",
                directionDestination: "",
            },
        },
    };

    return details ?? [detail]
}

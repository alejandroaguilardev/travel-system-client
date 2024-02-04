import { Contract, NewContract } from "./contract";

export const contractToNewContract = (contract: Contract): NewContract => {
    let client = contract?.client?.id;
    const pets = contract?.pets?.map(_ => {
        if (!_?.id && typeof _ === "string") {
            return _ as string;
        }
        return _.id;
    });

    if (!client && typeof contract.client === "string") {
        client = contract.client as string;
    }

    return {
        id: contract.id,
        client,
        number: contract.number,
        startDate: contract.startDate,
        pets,
        cage: {
            status: contract.services.cage.status,
            hasServiceIncluded: contract.services.cage.hasServiceIncluded,
            chosen: {
                modelCage: contract.services.cage.chosen?.modelCage ?? "",
                dimensionsCage: contract.services.cage.chosen?.dimensionsCage ?? "",
                typeCage: contract.services.cage.chosen?.typeCage ?? "",
            },
            recommendation: contract.services.cage.recommendation,
        },
        documentation: {
            status: contract.services.documentation.status,
            vaccinationCertificate: {
                hasServiceIncluded: contract.services.documentation.vaccinationCertificate.hasServiceIncluded,
                isApplied: contract.services.documentation.vaccinationCertificate.isApplied,
                expectedDate: contract.services.documentation.vaccinationCertificate.expectedDate,
                executionDate: contract.services.documentation.vaccinationCertificate.executionDate,
            },
            healthCertificate: {
                hasServiceIncluded: contract.services.documentation.healthCertificate.hasServiceIncluded,
                isApplied: contract.services.documentation.healthCertificate.isApplied,
                expectedDate: contract.services.documentation.healthCertificate.expectedDate,
                executionDate: contract.services.documentation.healthCertificate.executionDate,
            },
            chipCertificate: {
                hasServiceIncluded: contract.services.documentation.chipCertificate.hasServiceIncluded,
                isApplied: contract.services.documentation.chipCertificate.isApplied,
                expectedDate: contract.services.documentation.chipCertificate.expectedDate,
                executionDate: contract.services.documentation.chipCertificate.executionDate,
            },
            senasaDocuments: {
                hasServiceIncluded: contract.services.documentation.senasaDocuments.hasServiceIncluded,
                isApplied: contract.services.documentation.senasaDocuments.isApplied,
                expectedDate: contract.services.documentation.senasaDocuments.expectedDate,
                executionDate: contract.services.documentation.senasaDocuments.executionDate,
            },
            rabiesSeroLogicalTest: {
                hasServiceIncluded: contract.services.documentation.rabiesSeroLogicalTest.hasServiceIncluded,
                isApplied: contract.services.documentation.rabiesSeroLogicalTest.isApplied,
                expectedDate: contract.services.documentation.rabiesSeroLogicalTest.expectedDate,
                executionDate: contract.services.documentation.rabiesSeroLogicalTest.executionDate,
            },
            importLicense: {
                hasServiceIncluded: contract.services.documentation.importLicense.hasServiceIncluded,
                isApplied: contract.services.documentation.importLicense.isApplied,
                expectedDate: contract.services.documentation.importLicense.expectedDate,
                executionDate: contract.services.documentation.importLicense.executionDate,
            },
            emotionalSupportCertificate: {
                hasServiceIncluded: contract.services.documentation.emotionalSupportCertificate.hasServiceIncluded,
                isApplied: contract.services.documentation.emotionalSupportCertificate.isApplied,
                expectedDate: contract.services.documentation.emotionalSupportCertificate.expectedDate,
                executionDate: contract.services.documentation.emotionalSupportCertificate.executionDate,
            },
        },
        travel: {
            hasServiceIncluded: contract.services.travel.hasServiceIncluded,
            typeTraveling: contract.services.travel.typeTraveling,
            hasServiceAccompanied: contract.services.travel.hasServiceAccompanied,
        },
    }
}


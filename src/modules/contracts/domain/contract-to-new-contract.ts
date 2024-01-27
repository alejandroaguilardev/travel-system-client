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
            swornDeclaration: contract.services.cage.swornDeclaration,
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
            },
            healthCertificate: {
                hasServiceIncluded: contract.services.documentation.healthCertificate.hasServiceIncluded,
                isApplied: contract.services.documentation.healthCertificate.isApplied,
            },
            chipCertificate: {
                hasServiceIncluded: contract.services.documentation.chipCertificate.hasServiceIncluded,
                isApplied: contract.services.documentation.chipCertificate.isApplied,
            },
            senasaDocuments: {
                hasServiceIncluded: contract.services.documentation.senasaDocuments.hasServiceIncluded,
                isApplied: contract.services.documentation.senasaDocuments.isApplied,
            },
            rabiesSeroLogicalTest: {
                hasServiceIncluded: contract.services.documentation.rabiesSeroLogicalTest.hasServiceIncluded,
                isApplied: contract.services.documentation.rabiesSeroLogicalTest.isApplied,
            },
            importLicense: {
                hasServiceIncluded: contract.services.documentation.importLicense.hasServiceIncluded,
                isApplied: contract.services.documentation.importLicense.isApplied,
            },
            emotionalSupportCertificate: {
                hasServiceIncluded: contract.services.documentation.emotionalSupportCertificate.hasServiceIncluded,
                isApplied: contract.services.documentation.emotionalSupportCertificate.isApplied,
            },
        },
        travel: {
            hasServiceIncluded: contract.services.travel.hasServiceIncluded,
            typeTraveling: contract.services.travel.typeTraveling,
        },
    }
}


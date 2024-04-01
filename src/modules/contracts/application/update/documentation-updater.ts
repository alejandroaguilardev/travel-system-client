import { UuidService } from '../../../shared/domain/ports/uuid';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { Documentation } from '../../domain/contract-services/documentation/documentation';

export const documentationUpdater = (contractService: ContractDetailService, uuid: UuidService) => async (contractId: string, detailId: string, documentation: Documentation): Promise<ContractDetailUpdateResponse> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const updaterDocumentation: Documentation = {
        status: documentation.status,
        vaccinationCertificate: {
            hasServiceIncluded: documentation.vaccinationCertificate.hasServiceIncluded,
            isApplied: documentation.vaccinationCertificate.isApplied,
            expectedDate: documentation.vaccinationCertificate.expectedDate,
            executionDate: documentation.vaccinationCertificate.executionDate,
            resultDate: documentation.vaccinationCertificate.resultDate,
            user: documentation.vaccinationCertificate?.user
        },
        healthCertificate: {
            hasServiceIncluded: documentation.healthCertificate.hasServiceIncluded,
            isApplied: documentation.healthCertificate.isApplied,
            expectedDate: documentation.healthCertificate.expectedDate,
            executionDate: documentation.healthCertificate.executionDate,
            resultDate: documentation.healthCertificate.resultDate,
            user: documentation.healthCertificate?.user
        },
        chipCertificate: {
            hasServiceIncluded: documentation.chipCertificate.hasServiceIncluded,
            isApplied: documentation.chipCertificate.isApplied,
            expectedDate: documentation.chipCertificate.expectedDate,
            executionDate: documentation.chipCertificate.executionDate,
            resultDate: documentation.chipCertificate.resultDate,
            user: documentation.chipCertificate?.user
        },
        senasaDocuments: {
            hasServiceIncluded: documentation.senasaDocuments.hasServiceIncluded,
            isApplied: documentation.senasaDocuments.isApplied,
            expectedDate: documentation.senasaDocuments.expectedDate,
            executionDate: documentation.senasaDocuments.executionDate,
            resultDate: documentation.senasaDocuments.resultDate,
            user: documentation.senasaDocuments?.user
        },
        rabiesSeroLogicalTest: {
            hasServiceIncluded: documentation.rabiesSeroLogicalTest.hasServiceIncluded,
            isApplied: documentation.rabiesSeroLogicalTest.isApplied,
            expectedDate: documentation.rabiesSeroLogicalTest.expectedDate,
            executionDate: documentation.rabiesSeroLogicalTest.executionDate,
            resultDate: documentation.rabiesSeroLogicalTest.resultDate,
            user: documentation.rabiesSeroLogicalTest?.user
        },
        importLicense: {
            hasServiceIncluded: documentation.importLicense.hasServiceIncluded,
            isApplied: documentation.importLicense.isApplied,
            expectedDate: documentation.importLicense.expectedDate,
            executionDate: documentation.importLicense.executionDate,
            resultDate: documentation.importLicense.resultDate,
            user: documentation.importLicense?.user
        },
        emotionalSupportCertificate: {
            hasServiceIncluded: documentation.emotionalSupportCertificate.hasServiceIncluded,
            isApplied: documentation.emotionalSupportCertificate.isApplied,
            expectedDate: documentation.emotionalSupportCertificate.expectedDate,
            executionDate: documentation.emotionalSupportCertificate.executionDate,
            resultDate: documentation.emotionalSupportCertificate.resultDate,
            user: documentation.emotionalSupportCertificate?.user
        },
    }

    const response = await contractService.updateDocumentation(contractId, detailId, updaterDocumentation);
    return response;
}
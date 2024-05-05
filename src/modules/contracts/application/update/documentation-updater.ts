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
        clientStatus: documentation.clientStatus,
        vaccinationCertificate: {
            hasServiceIncluded: documentation.vaccinationCertificate.hasServiceIncluded,
            isRequired: documentation.vaccinationCertificate.isRequired,
            isApplied: documentation.vaccinationCertificate.isApplied,
            expectedDate: documentation.vaccinationCertificate.expectedDate,
            executionDate: documentation.vaccinationCertificate.executionDate,
            resultDate: documentation.vaccinationCertificate.resultDate,
            isPrint: documentation.vaccinationCertificate.isPrint,
            observation: documentation.vaccinationCertificate.observation,
            user: documentation.vaccinationCertificate?.user
        },
        healthCertificate: {
            hasServiceIncluded: documentation.healthCertificate.hasServiceIncluded,
            isRequired: documentation.vaccinationCertificate.isRequired,
            isApplied: documentation.healthCertificate.isApplied,
            expectedDate: documentation.healthCertificate.expectedDate,
            executionDate: documentation.healthCertificate.executionDate,
            resultDate: documentation.healthCertificate.resultDate,
            isPrint: documentation.healthCertificate.isPrint,
            observation: documentation.healthCertificate.observation,
            user: documentation.healthCertificate?.user
        },
        chipCertificate: {
            hasServiceIncluded: documentation.chipCertificate.hasServiceIncluded,
            isRequired: documentation.vaccinationCertificate.isRequired,
            isApplied: documentation.chipCertificate.isApplied,
            expectedDate: documentation.chipCertificate.expectedDate,
            executionDate: documentation.chipCertificate.executionDate,
            resultDate: documentation.chipCertificate.resultDate,
            isPrint: documentation.chipCertificate.isPrint,
            observation: documentation.chipCertificate.observation,
            user: documentation.chipCertificate?.user
        },
        senasaDocuments: {
            hasServiceIncluded: documentation.senasaDocuments.hasServiceIncluded,
            isRequired: documentation.vaccinationCertificate.isRequired,
            isApplied: documentation.senasaDocuments.isApplied,
            expectedDate: documentation.senasaDocuments.expectedDate,
            executionDate: documentation.senasaDocuments.executionDate,
            resultDate: documentation.senasaDocuments.resultDate,
            isPrint: documentation.senasaDocuments.isPrint,
            observation: documentation.senasaDocuments.observation,
            user: documentation.senasaDocuments?.user
        },
        rabiesSeroLogicalTest: {
            hasServiceIncluded: documentation.rabiesSeroLogicalTest.hasServiceIncluded,
            isRequired: documentation.vaccinationCertificate.isRequired,
            isApplied: documentation.rabiesSeroLogicalTest.isApplied,
            expectedDate: documentation.rabiesSeroLogicalTest.expectedDate,
            executionDate: documentation.rabiesSeroLogicalTest.executionDate,
            resultDate: documentation.rabiesSeroLogicalTest.resultDate,
            isPrint: documentation.rabiesSeroLogicalTest.isPrint,
            observation: documentation.rabiesSeroLogicalTest.observation,
            user: documentation.rabiesSeroLogicalTest?.user
        },
        importLicense: {
            hasServiceIncluded: documentation.importLicense.hasServiceIncluded,
            isRequired: documentation.vaccinationCertificate.isRequired,
            isApplied: documentation.importLicense.isApplied,
            expectedDate: documentation.importLicense.expectedDate,
            executionDate: documentation.importLicense.executionDate,
            resultDate: documentation.importLicense.resultDate,
            isPrint: documentation.importLicense.isPrint,
            observation: documentation.importLicense.observation,
            user: documentation.importLicense?.user
        },
        emotionalSupportCertificate: {
            hasServiceIncluded: documentation.emotionalSupportCertificate.hasServiceIncluded,
            isRequired: documentation.emotionalSupportCertificate.isRequired,
            isApplied: documentation.emotionalSupportCertificate.isApplied,
            expectedDate: documentation.emotionalSupportCertificate.expectedDate,
            executionDate: documentation.emotionalSupportCertificate.executionDate,
            resultDate: documentation.emotionalSupportCertificate.resultDate,
            isPrint: documentation.emotionalSupportCertificate.isPrint,
            observation: documentation.emotionalSupportCertificate.observation,
            user: documentation.emotionalSupportCertificate?.user
        },
    }

    const response = await contractService.updateDocumentation(contractId, detailId, updaterDocumentation);
    return response;
}
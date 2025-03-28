import { UuidService } from '../../../shared/domain/ports/uuid';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { DocumentationCertificate } from '../../domain/contract-services/documentation/documentation-certificate';
import { ContractDetailStatus } from '../../domain/contract-status';

export const certificateUpdater = (contractService: ContractDetailService, uuid: UuidService) => async (contractId: string, detailId: string, action: string, certificate: DocumentationCertificate, status: ContractDetailStatus, userId: string): Promise<ContractDetailUpdateResponse> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const documentationCertificate: DocumentationCertificate = {
        hasServiceIncluded: certificate.hasServiceIncluded,
        isApplied: certificate.isApplied,
        expectedDate: certificate.expectedDate,
        executionDate: certificate.executionDate,
        resultDate: certificate.resultDate,
        isRequired: certificate.isRequired,
        isPrint: certificate.isPrint,
        observation: certificate.observation,
        user: userId
    }

    const response = await contractService.updateCertificate(contractId, detailId, action, {
        status,
        clientStatus: "pending",
        [action]: documentationCertificate
    });
    return response;
}
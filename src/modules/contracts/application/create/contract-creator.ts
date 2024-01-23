import { NewContract } from '../../domain/contract';
import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';

export const contractCreator = (contractService: ContractService, uuid: UuidService) => async (contract: NewContract): Promise<ResponseSuccess> => {
    contract.id = uuid.generate()!;

    if (contract.cage?.hasServiceIncluded) {
        contract.cage.status = "pending";
    }

    if (
        contract.documentation.vaccinationCertificate.hasServiceIncluded ||
        contract.documentation.healthCertificate.hasServiceIncluded ||
        contract.documentation.chipCertificate.hasServiceIncluded ||
        contract.documentation.senasaDocuments.hasServiceIncluded ||
        contract.documentation.rabiesSeroLogicalTest.hasServiceIncluded ||
        contract.documentation.importLicense.hasServiceIncluded ||
        contract.documentation.emotionalSupportCertificate.hasServiceIncluded
    ) {
        contract.documentation.status = "pending";
    }
    const response = await contractService.save(contract);
    return response;
}
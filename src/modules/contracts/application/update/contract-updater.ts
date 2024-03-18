import { Contract, NewContract, NewPostContract } from '../../domain/contract';
import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ResponseSuccess } from '../../../shared/domain/response/response-success';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { securePayInInstallments } from '../../domain/payment-summary';


export const contractUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, contract: NewContract): Promise<{ message: string, contract: NewPostContract }> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }
    securePayInInstallments(contract?.payInInstallments ?? []);

    const newContract: NewPostContract = {
        ...contract,
        details: contract.details.map(detail => {

            return {
                ...detail,
                pet: detail?.pet?.id,
            }
        })
    }

    const response = await contractService.update(contractId, newContract);
    return { message: response.message, contract: newContract };
}



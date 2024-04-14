import { ContractPayments } from '../../domain/contract';
import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';


export const paymentUpdater = (contractService: ContractService, uuid: UuidService) => async (contractId: string, data: ContractPayments): Promise<{ message: string }> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const updateData: ContractPayments = formatPaymentData(data);

    const response = await contractService.updatePayment(contractId, updateData);
    return { message: response.message };
}

function formatPaymentData(data: ContractPayments) {
    return {
        payInInstallments: data.payInInstallments?.map(_ => ({
            price: _.price,
            percentage: _.percentage,
            date: _.date,
            isPay: _.isPay,
            customerPayments: _?.customerPayments?.map(_ => ({
                price: _.price,
                date: _.date,
                method: _.method,
            })) ?? [],
        })) ?? [],
    }
}



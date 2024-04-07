import { NewContract, NewPostContract } from '../../domain/contract';
import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { securePayInInstallments } from '../../domain/payment-summary';
import { CustomerPayment } from '../../domain/customer-payments';

export const contractCreator = (contractService: ContractService, uuid: UuidService) => async (contract: NewContract): Promise<{ message: string, contract: NewPostContract }> => {
    contract.id = uuid.generate();

    securePayInInstallments(contract?.payInInstallments ?? []);

    const newContract: NewPostContract = contractCreatorFormat(contract, uuid);
    const newContractWithCustomerPayment: NewPostContract = contractWithCustomerPayment(contract, newContract);

    const response = await contractService.save(newContractWithCustomerPayment);
    return { message: response.message, contract: newContractWithCustomerPayment };
}


export const contractWithCustomerPayment = (contract: NewContract, newContract: NewPostContract): NewPostContract => {
    const customerPayments: CustomerPayment[] = [];
    if (contract?.payInInstallments && contract.payInInstallments.length > 0) {
        customerPayments.push({
            date: contract.payInInstallments[0].date,
            price: contract.payInInstallments[0].price,
            method: "",
        })
    }
    newContract.customerPayments = customerPayments;
    return newContract;
}

export const contractCreatorFormat = (contract: NewContract, uuid: UuidService): NewPostContract => {
    return {
        ...contract,
        number: contract.number === "0" ? "" : contract.number,
        details: contract.details.map(({ topico, ...detail }) => {
            return {
                ...detail,
                id: detail?.id || uuid.generate(),
                pet: detail?.pet?.id,
            }
        }),
        payInInstallments: contract.payInInstallments?.map((_) => ({
            price: _.price,
            percentage: _.percentage,
            date: _.date,
        })),
        customerPayments: contract.customerPayments?.map((_) => ({
            price: _.price,
            date: _.date,
            method: _.method,
        })),
    }

}
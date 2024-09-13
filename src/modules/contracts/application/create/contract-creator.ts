import { NewContract, NewPostContract } from '../../domain/contract';
import { ContractService } from '../../domain/contract.service';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { securePayInInstallments } from '../../domain/payment-summary';

export const contractCreator = (contractService: ContractService, uuid: UuidService) => async (contract: NewContract): Promise<{ message: string, contract: NewPostContract }> => {
    contract.id = uuid.generate();

    securePayInInstallments(contract?.payInInstallments ?? []);

    const newContract: NewPostContract = contractCreatorFormat(contract, uuid);
    const newContractWithCustomerPayment: NewPostContract = contractWithCustomerPayment(newContract);

    const response = await contractService.save(newContractWithCustomerPayment);
    return { message: response.message, contract: newContractWithCustomerPayment };
}


export const contractWithCustomerPayment = (contract: NewPostContract): NewPostContract => {
    if (!contract?.payInInstallments || contract?.payInInstallments?.length === 0) {
        contract.payInInstallments = [{
            date: contract.startDate,
            isPay: true,
            percentage: 100,
            price: contract.price,
            customerPayments: [{
                date: contract.startDate,
                price: contract.price,
                method: "Pago total sin cuotas",
            }]
        }]
    }
    return contract;
}

export const contractCreatorFormat = (contract: NewContract, uuid: UuidService): NewPostContract => {
    return {
        ...contract,
        number: contract.number === "0" ? "" : contract.number,
        details: contract.details.map(({ topico, ...detail }) => {
            return {
                ...detail,
                topico,
                id: detail?.id || uuid.generate(),
                pet: detail?.pet?.id,
            }
        }),
        payInInstallments: contract.payInInstallments?.map((payInInstallment) => ({
            price: payInInstallment.price,
            percentage: payInInstallment.percentage,
            date: payInInstallment.date,
            isPay: payInInstallment.isPay,
            customerPayments: payInInstallment.customerPayments?.map(customerPayments => ({
                price: customerPayments.price,
                date: customerPayments.date,
                method: customerPayments.method,
            }))
        })),

    }

}
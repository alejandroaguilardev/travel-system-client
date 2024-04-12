import { Contract, NewContract } from "./contract";
import { NewContractDetail } from "./contract-detail";

export const contractToNewContract = (contract: Contract): NewContract => {
    let client = contract?.client?.id;

    if (!client && typeof contract.client === "string") {
        client = contract.client as string;
    }
    let details: NewContractDetail[] = [];
    if (contract?.details && contract?.details.length > 0 && contract?.details[0]?.id) {
        details = contract?.details.map(_ => ({
            id: _.id,
            cage: _.cage,
            travel: _.travel,
            pet: _.pet,
            documentation: _.documentation,
            topico: _.topico,
            user: _.user
        }));
    }



    return {
        id: contract.id,
        client,
        number: contract.number,
        startDate: contract.startDate,
        details,
        adviser: contract.adviser.id,
        price: contract.price,
        customerPayments: contract?.customerPayments ?? [],
        payInInstallments: contract?.payInInstallments ?? [],
        folder: contract?.folder ?? "",
        reasonForCancellation: contract?.reasonForCancellation ?? ""
    }
}


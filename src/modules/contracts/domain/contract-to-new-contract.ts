import { Contract, NewContract } from "./contract";
import { NewContractDetail } from "./contract-detail";

export const contractToNewContract = (contract: Contract): NewContract => {
    let client = contract?.client?.id;

    if (!client && typeof contract.client === "string") {
        client = contract.client as string;
    }

    const details: NewContractDetail[] = contract?.details.map(_ => ({
        id: _.id,
        cage: _.cage,
        travel: {
            hasServiceIncluded: _.travel.hasServiceIncluded,
            hasServiceAccompanied: _.travel.hasServiceAccompanied,
            typeTraveling: _.travel.typeTraveling,
        },
        pet: _.pet,
        documentation: _.documentation,
    }));


    return {
        id: contract.id,
        client,
        number: contract.number,
        startDate: contract.startDate,
        details,
    }
}


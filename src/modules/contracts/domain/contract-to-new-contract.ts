import { Contract, UpdateContract } from "./contract";

export const contractToNewContract = (contract: Contract): UpdateContract => {
    const client = contract.client.id;
    return {
        ...contract,
        client
    }
}
import { CONTRACT_STATUS } from '../../../../src/modules/contracts/domain/contract-status';

export const contractStatusCreateMother = () => {
    const randomIndex = Math.floor(Math.random() * CONTRACT_STATUS.values.length);
    return CONTRACT_STATUS[randomIndex].value;
}
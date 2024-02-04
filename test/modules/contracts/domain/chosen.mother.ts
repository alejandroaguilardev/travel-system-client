import { CAGES_CHOSEN, CageChosen } from '../../../../src/modules/contracts/domain/contract-services/cage/cage-chosen';

export const chosenCreateMother = (): CageChosen => {
    const randomIndex = Math.floor(Math.random() * CAGES_CHOSEN.values.length);
    return CAGES_CHOSEN[randomIndex];

}
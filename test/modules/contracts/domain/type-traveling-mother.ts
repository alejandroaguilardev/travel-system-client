import { TRAVEL_TYPES, TypeTraveling } from '../../../../src/modules/contracts/domain/travel/contract-travel';

export const typeTravelingCreateMother = (): TypeTraveling => {
    const randomIndex = Math.floor(Math.random() * TRAVEL_TYPES.values.length);
    return TRAVEL_TYPES[randomIndex].value;
}
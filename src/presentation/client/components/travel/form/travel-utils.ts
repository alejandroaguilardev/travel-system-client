import { Travel } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { travelPetPerChargeValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-pet-per-charge';
import { travelDestinationValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-destination';
import { travelAccompaniedPetValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { isNotEmptyTravelAirlineReservation } from '../../../../../modules/contracts/domain/contract-services/travel/travel-airline-reservation';

export const isTravelAccompaniedFormEdit = (travel: Travel) => {
    const isPerChargeEdit = travel.typeTraveling === "charge" ? travelPetPerChargeValidate(travel.petPerCharge) : true;
    if (travelAccompaniedPetValidate(travel.accompaniedPet) && travelDestinationValidate(travel.destination) && isPerChargeEdit) {
        return false;
    }
    return true;
}
export const isTravelReserveFormEdit = (travel: Travel) => {
    const isGuideNumberEdit = travel.typeTraveling === "charge" ? travel.guideNumber : true;

    if (isNotEmptyTravelAirlineReservation(travel.airlineReservation) && isGuideNumberEdit) {
        return false;
    }
    return true;
}

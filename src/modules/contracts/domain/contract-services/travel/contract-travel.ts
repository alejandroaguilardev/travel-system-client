import { ContractStatus } from '../../contract-status';
import { TravelAirlineReservation } from './travel-airline-reservation';
import { TravelPetPerCharge } from './travel-pet-per-charge';

export type TypeTraveling = 'accompanied' | 'charge' | 'none';

export interface Travel {
    status: ContractStatus;
    hasServiceIncluded: boolean;
    typeTraveling: TypeTraveling;
    airlineReservation: TravelAirlineReservation,
    petPerCharge: TravelPetPerCharge;
}

export interface PartialTravel extends Omit<Partial<Travel>, "airlineReservation" | "petPerCharge"> {
    airlineReservation: Partial<TravelAirlineReservation>;
    petPerCharge: Partial<TravelPetPerCharge>;
};
export const TRAVEL_TYPES: { value: TypeTraveling, label: string }[] = [
    {
        value: "accompanied",
        label: " VIAJE DE UNA MASCOTA  VIAJANDO EN BODEGA O EN CABINA POR UNA PERSONA"
    },
    {
        value: "charge",
        label: "VIAJE DE UNA MASCOTA POR CARGO"
    }
]
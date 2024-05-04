import { ContractStatus } from '../../contract-status';
import { TravelAccompaniedPet } from './travel-accompanied-pet';
import { TravelAirlineReservation } from './travel-airline-reservation';
import { TravelDestination } from './travel-destination';
import { TravelPetPerCharge } from './travel-pet-per-charge';

export type TypeTraveling = 'accompanied' | 'charge' | 'none';

export interface Travel {
    status: ContractStatus;
    hasServiceIncluded: boolean;
    hasServiceAccompanied: boolean;
    typeTraveling: TypeTraveling;
    airlineReservation: TravelAirlineReservation,
    petPerCharge: TravelPetPerCharge;
    accompaniedPet: TravelAccompaniedPet;
    destination: TravelDestination;
    guideNumber: string,
    observation?: string;
}

export interface PartialTravel extends Omit<Partial<Travel>, "airlineReservation" | "petPerCharge" | "accompaniedPet" | "destination"> {
    airlineReservation: Partial<TravelAirlineReservation>;

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
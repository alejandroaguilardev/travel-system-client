import { ContractStatus } from '../../contract-status';

export type TypeTraveling = 'accompanied' | 'charge' | 'none';


export interface TravelAirlineReservation {
  code: string;
  flightNumber: string;
  departureAirport: string;
  destinationAirport: string;
  departureDate: Date | null;
  arrivalDate: Date | null;
};

export interface TravelPetPerCharge {
  receptor: string;
  email: string;
  phone: string;
  pickupDateTime: Date | null;
  pickupLocation: string;
  specialRequests: string;
};

export interface Travel {
  status: ContractStatus;
  hasServiceIncluded: boolean;
  hasServiceAccompanied: boolean;
  typeTraveling: TypeTraveling;
  airlineReservation: TravelAirlineReservation,
  petPerCharge: TravelPetPerCharge;
}

export interface PartialTravel extends Omit<Partial<Travel>, "airlineReservation" | "petPerCharge"> {
  airlineReservation: Partial<TravelAirlineReservation>;
  petPerCharge: Partial<TravelPetPerCharge>;
};
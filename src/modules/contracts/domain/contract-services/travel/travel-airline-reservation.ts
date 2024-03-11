export interface TravelAirlineReservation {
    code: string;
    flightNumber: string;
    departureAirport: string;
    destinationAirport: string;
    departureDate: Date | null;
    arrivalDate: Date | null;
};
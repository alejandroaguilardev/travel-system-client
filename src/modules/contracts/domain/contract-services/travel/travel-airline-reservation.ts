export interface TravelAirlineReservation {
    code: string;
    flightNumber: string;
    departureAirport: string;
    destinationAirport: string;
    departureDate: Date | null;
    arrivalDate: Date | null;
    itinerary: string;
    archive: string;
};


export const isNotEmptyTravelAirlineReservation = (travelAirlineReservation: TravelAirlineReservation) => {
    return !!travelAirlineReservation?.code &&
        !!travelAirlineReservation?.flightNumber &&
        !!travelAirlineReservation?.departureAirport &&
        !!travelAirlineReservation?.destinationAirport &&
        !!travelAirlineReservation?.departureDate &&
        !!travelAirlineReservation?.arrivalDate &&
        !!travelAirlineReservation?.itinerary;
}


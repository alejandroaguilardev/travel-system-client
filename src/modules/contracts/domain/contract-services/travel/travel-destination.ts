export interface TravelDestination {
    countryDestination: string;
    cityDestination: string;
    directionDestination: string;
}

export const travelDestinationValidate = (destination: TravelDestination): boolean => {
    return !!destination?.cityDestination &&
        !!destination?.countryDestination &&
        !!destination?.directionDestination
}

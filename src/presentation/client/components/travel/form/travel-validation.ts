import * as Yup from 'yup';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status'
import { PartialTravel, TRAVEL_TYPES, TypeTraveling } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';

export const defaultValues: PartialTravel = {
    status: 'none',
    hasServiceIncluded: false,
    typeTraveling: 'none',
    airlineReservation: {
        code: '',
        flightNumber: '',
        departureAirport: '',
        destinationAirport: '',
        departureDate: null,
        arrivalDate: null,
    },
    hasServiceAccompanied: false,
};



export const travelSchema: Yup.ObjectSchema<PartialTravel> = Yup.object().shape({
    status: Yup.string().oneOf(CONTRACT_STATUS.map((status) => status.value)),
    hasServiceAccompanied: Yup.boolean(),
    typeTraveling: Yup.string().oneOf(["none" as TypeTraveling, ...TRAVEL_TYPES.map((_) => _.value)]),
    airlineReservation: Yup.object().shape({
        code: Yup.string(),
        flightNumber: Yup.string(),
        departureAirport: Yup.string(),
        destinationAirport: Yup.string(),
        departureDate: Yup.date().nullable(),
        arrivalDate: Yup.date().nullable(),
        user: Yup.string()
    }),
    hasServiceIncluded: Yup.boolean(),

});



import * as Yup from 'yup';
import { PartialTravelDefinition, TravelDefinition, TypeTraveling } from '../../../../../modules/contracts/domain/interfaces/travel';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status'
import { TRAVEL_TYPES } from '../../../../../modules/contracts/domain/travel/contract-travel';

export const defaultValues: TravelDefinition = {
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
    petPerCharge: {
        receptor: '',
        email: '',
        phone: '',
        pickupDateTime: null,
        pickupLocation: '',
        specialRequests: '',
    },
};



export const travelSchema: Yup.ObjectSchema<PartialTravelDefinition> = Yup.object().shape({
    status: Yup.string().oneOf(CONTRACT_STATUS.map((status) => status.value)),
    hasServiceIncluded: Yup.boolean(),
    typeTraveling: Yup.string().oneOf(["none" as TypeTraveling, ...TRAVEL_TYPES.map((_) => _.value)]),
    airlineReservation: Yup.object().shape({
        code: Yup.string(),
        flightNumber: Yup.string(),
        departureAirport: Yup.string(),
        destinationAirport: Yup.string(),
        departureDate: Yup.date().nullable(),
        arrivalDate: Yup.date().nullable(),
    }),
    petPerCharge: Yup.object().shape({
        receptor: Yup.string(),
        email: Yup.string().email('Por favor, introduce un correo electrónico válido.'),
        phone: Yup.string(),
        pickupDateTime: Yup.date().nullable(),
        pickupLocation: Yup.string(),
        specialRequests: Yup.string(),
    }),
});



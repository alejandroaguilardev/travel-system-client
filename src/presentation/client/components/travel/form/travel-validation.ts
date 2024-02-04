import * as Yup from 'yup';
import { CONTRACT_STATUS } from '../../../../../modules/contracts/domain/contract-status'
import { PartialTravel, TRAVEL_TYPES, Travel, TypeTraveling } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';

export const defaultValues: Travel = {
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
        user: "",
    },
    petPerCharge: {
        receptor: '',
        email: '',
        phone: '',
        pickupDateTime: null,
        pickupLocation: '',
        specialRequests: '',
        user: "",
    },
};



export const travelSchema: Yup.ObjectSchema<PartialTravel> = Yup.object().shape({
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
        user: Yup.string()
    }),
    petPerCharge: Yup.object().shape({
        receptor: Yup.string(),
        email: Yup.string().email('Por favor, introduce un correo electrónico válido.'),
        phone: Yup.string(),
        pickupDateTime: Yup.date().nullable(),
        pickupLocation: Yup.string(),
        specialRequests: Yup.string(),
        user: Yup.string()
    }),
});



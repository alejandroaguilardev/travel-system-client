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
        departureAirport: 'Aeropuerto Internacional Jorge Chávez Lima, Perú',
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
        code: Yup.string().required("Indica el código de reserva"),
        flightNumber: Yup.string().required("Indica el número de vuelo"),
        departureAirport: Yup.string().required("Indica el aeropuerto de salida"),
        destinationAirport: Yup.string().required("Indica el aeropuerto de llegada"),
        departureDate: Yup.date().nullable().required("Indica la fecha de salida"),
        arrivalDate: Yup.date().nullable().required("Indica la fecha de llegada"),
        user: Yup.string()
    }),
    hasServiceIncluded: Yup.boolean(),
    guideNumber: Yup.string(),

});



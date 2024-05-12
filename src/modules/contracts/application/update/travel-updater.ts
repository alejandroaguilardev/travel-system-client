import { ErrorInvalidadArgument } from '../../../shared/domain/errors/error-invalid-argument';
import { UuidService } from '../../../shared/domain/ports/uuid';
import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { PartialTravel } from '../../domain/contract-services/travel/contract-travel';

export const travelUpdater = (contractService: ContractDetailService, uuid: UuidService) => async (contractId: string, detailId: string, travel: PartialTravel): Promise<ContractDetailUpdateResponse> => {
    if (!uuid.validate(contractId)) {
        throw new ErrorInvalidadArgument("el identificador no es válido");
    }

    const travelUpdate: PartialTravel = {
        status: travel.status,
        hasServiceIncluded: travel.hasServiceIncluded,
        hasServiceAccompanied: travel.hasServiceAccompanied,
        typeTraveling: travel.typeTraveling,
        airlineReservation: {
            code: travel.airlineReservation.code,
            flightNumber: travel.airlineReservation.flightNumber,
            departureAirport: travel.airlineReservation.departureAirport,
            destinationAirport: travel.airlineReservation.destinationAirport,
            departureDate: travel.airlineReservation.departureDate,
            arrivalDate: travel.airlineReservation.arrivalDate,
            itinerary: travel.airlineReservation.itinerary,
            archive: travel.airlineReservation.archive
        },
        guideNumber: travel?.guideNumber ?? ""
    }

    const response = await contractService.updateTravel(contractId, detailId, travelUpdate);
    return response;
}
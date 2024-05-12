import { ContractDetailService, ContractDetailUpdateResponse } from '../../domain/contract-detail.service';
import { TravelAccompaniedPet } from '../../domain/contract-services/travel/travel-accompanied-pet';
import { TravelDestination } from '../../domain/contract-services/travel/travel-destination';
import { TravelPetPerCharge } from '../../domain/contract-services/travel/travel-pet-per-charge';

export const AccompaniedPetUpdater = (contractService: ContractDetailService) => async (contractId: string, detailId: string, accompaniedPet: TravelAccompaniedPet, destination: TravelDestination, petPerCharge: Partial<TravelPetPerCharge>, observation: string): Promise<ContractDetailUpdateResponse> => {

    const { updatedAccompaniedPet, updatedTravelDestination, updatedTravelPetPerCharge } = accompaniedFormat(accompaniedPet, destination, petPerCharge);

    const response = await contractService.updateAccompaniedPet(contractId, detailId, updatedAccompaniedPet, updatedTravelDestination, updatedTravelPetPerCharge, observation);
    return response;
}


export const accompaniedFormat = (accompaniedPet: TravelAccompaniedPet, destination: TravelDestination, petPerCharge: Partial<TravelPetPerCharge>) => {
    const updatedAccompaniedPet: TravelAccompaniedPet = {
        name: accompaniedPet.name,
        document: accompaniedPet.document || "",
        documentNumber: accompaniedPet.documentNumber || "",
        direction: accompaniedPet.direction || "",
        district: accompaniedPet.district || "",
        province: accompaniedPet.province || "",
        department: accompaniedPet.department || "",
        phone: accompaniedPet.phone || "",
        email: accompaniedPet.email || "",
        image: accompaniedPet.image || "",
    };

    const updatedTravelDestination: TravelDestination = {
        countryDestination: destination.countryDestination || "",
        cityDestination: destination.cityDestination || "",
        directionDestination: destination.directionDestination || "",
    }

    const updatedTravelPetPerCharge: TravelPetPerCharge = {
        name: petPerCharge?.name ?? "",
        document: petPerCharge?.document ?? "",
        documentNumber: petPerCharge?.documentNumber ?? "",
        phone: petPerCharge?.phone ?? "",
        email: petPerCharge?.email ?? ""
    };

    return { updatedAccompaniedPet, updatedTravelDestination, updatedTravelPetPerCharge }
}
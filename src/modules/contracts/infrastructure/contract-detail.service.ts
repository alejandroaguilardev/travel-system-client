import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { endpoints } from '../../shared/domain/endpoint';
import { ContractDetailService, ContractDetailUpdateResponse } from '../domain/contract-detail.service';
import { ContractDetail } from '../domain/contract-detail';
import { Criteria, criteriaToQueryString } from '../../shared/domain/criteria/criteria';
import { ResponseSearch } from '../../shared/domain/response/response-search';
import { Documentation } from '../domain/contract-services/documentation/documentation';
import { PartialTravel } from '../domain/contract-services/travel/contract-travel';
import { Cage } from '../domain/contract-services/cage/cage';
import { ResponseSuccess } from 'src/modules/shared/domain/response/response-success';
import { TravelPetPerCharge } from '../domain/contract-services/travel/travel-pet-per-charge';
import { TravelAccompaniedPet } from '../domain/contract-services/travel/travel-accompanied-pet';
import { TravelDestination } from '../domain/contract-services/travel/travel-destination';


export const contractDetailService: ContractDetailService = {
    search: async (criteria: Criteria): Promise<ResponseSearch<ContractDetail[]>> => {
        const { data } = await axiosInstance.get(`${endpoints.contracts.detail}${criteriaToQueryString(criteria)}`);
        return data;
    },
    searchById: async (contractId: string, contractDetailId: string): Promise<ContractDetail> => {
        const { data } = await axiosInstance.get(`${endpoints.contracts.detail}/${contractId}/${contractDetailId}`);
        return data;
    },

    updateDocumentation: async (contractId: string, detailId: string, body: Documentation): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/documentation`, body);
        return data;
    },
    updateCage: async (contractId: string, detailId: string, body: Cage): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/cage`, body);
        return data;
    },
    updateTravel: async (contractId: string, detailId: string, body: PartialTravel): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/travel`, body);
        return data;
    },
    updateAccompaniedPet: async (
        contractId: string,
        detailId: string,
        accompaniedPet: TravelAccompaniedPet,
        destination: TravelDestination,
        petPerCharge: TravelPetPerCharge): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/accompanied`, {
            accompaniedPet,
            destination,
            petPerCharge
        });
        return data;
    },
} 
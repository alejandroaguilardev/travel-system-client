import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Contract } from '../domain/contract';
import { endpoints } from '../../shared/domain/endpoint';
import { ContractDetailService, ContractDetailUpdateResponse } from '../domain/contract-detail.service';
import { ContractDetail } from '../domain/contract-detail';
import { Criteria, criteriaToQueryString } from '../../shared/domain/criteria/criteria';
import { ResponseSearch } from '../../shared/domain/response/response-search';
import { Documentation } from '../domain/contract-services/documentation/documentation';
import { PartialTravel } from '../domain/contract-services/travel/contract-travel';
import { Cage } from '../domain/contract-services/cage/cage';


export const contractDetailService: ContractDetailService = {
    search: async (criteria: Criteria): Promise<ResponseSearch<ContractDetail[]>> => {
        const { data } = await axiosInstance.get(`${endpoints.contracts.detail}${criteriaToQueryString(criteria)}`);
        return data;
    },
    searchById: async (id: string): Promise<ContractDetail> => {
        const { data } = await axiosInstance.get(`${endpoints.contracts.detail}/${id}`);
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
} 
import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Contract, NewContract } from '../domain/contract';
import { ContractService } from '../domain/contract.service';
import { endpoints } from '../../shared/domain/endpoint';
import { ResponseSuccess } from '../../shared/domain/response/response-success';
import { Documentation } from '../domain/contract-services/documentation/documentation';
import { Cage } from '../domain/contract-services/cage/cage';
import { PartialTravel } from '../domain/contract-services/travel/contract-travel';


export const contractService: ContractService = {
    ...servicesHost<NewContract>(axiosInstance, endpoints.contracts.root),
    searchClientById: async (clientId): Promise<Contract[]> => {
        const { data } = await axiosInstance.get<Contract[]>(`${endpoints.contracts.client}/${clientId}`);
        return data;
    },
    update: async (id: string, body: Partial<NewContract>): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.put<ResponseSuccess>(`${endpoints.contracts.root}/${id}`, body);
        return data;
    },
    updateDocumentation: async (contractId: string, body: Documentation): Promise<Contract> => {
        const { data } = await axiosInstance.patch<Contract>(`${endpoints.contracts.root}/${contractId}/documentation`, body);
        return data;
    },
    updateCage: async (contractId: string, body: Cage): Promise<Contract> => {
        const { data } = await axiosInstance.patch<Contract>(`${endpoints.contracts.root}/${contractId}/cage`, body);
        return data;
    },
    updateTravel: async (contractId: string, body: PartialTravel): Promise<Contract> => {
        const { data } = await axiosInstance.patch<Contract>(`${endpoints.contracts.root}/${contractId}/travel`, body);
        return data;
    },
    finish: async (contractId: string): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.post(`${endpoints.contracts.root}/${contractId}/finish`);
        return data;
    },
} 

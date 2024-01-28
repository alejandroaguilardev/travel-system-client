import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Contract, NewContract } from '../domain/contract';
import { ContractService } from '../domain/contract.service';
import { endpoints } from '../../shared/domain/endpoint';
import { ResponseSuccess } from '../../shared/domain/response/response-success';
import { DocumentationDefinition } from '../domain/interfaces/documentation';
import { CageDefinition } from '../domain/interfaces/cage';
import { PartialTravelDefinition } from '../domain/interfaces/travel';


export const contractService: ContractService = {
    ...servicesHost<NewContract>(axiosInstance, endpoints.contracts.root),
    searchClientById: async (clientId): Promise<Contract[]> => {
        const { data } = await axiosInstance.get<Contract[]>(`${endpoints.contracts.client}/${clientId}`);
        return data;
    },
    update: async (id: string, body: Partial<NewContract>): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.patch<ResponseSuccess>(`${endpoints.contracts.root}/${id}`, body);
        return data;
    },
    updateDocumentationClient: async (contractId: string, body: DocumentationDefinition): Promise<Contract> => {
        const { data } = await axiosInstance.patch<Contract>(`${endpoints.contracts.root}/${contractId}/documentation/client`, body);
        return data;
    },
    updateCage: async (contractId: string, body: CageDefinition): Promise<Contract> => {
        const { data } = await axiosInstance.patch<Contract>(`${endpoints.contracts.root}/${contractId}/cage/client`, body);
        return data;
    },
    updateTravel: async (contractId: string, body: PartialTravelDefinition): Promise<Contract> => {
        const { data } = await axiosInstance.patch<Contract>(`${endpoints.contracts.root}/${contractId}/travel/client`, body);
        return data;
    },
    finish: async (contractId: string): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.post(`${endpoints.contracts.root}/${contractId}/finish`);
        return data;
    },
} 

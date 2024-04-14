import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Contract, ContractPayments, NewPostContract } from '../domain/contract';
import { ContractService } from '../domain/contract.service';
import { endpoints } from '../../shared/domain/endpoint';
import { ResponseSuccess } from '../../shared/domain/response/response-success';
import { Criteria, criteriaToQueryString } from '../../shared/domain/criteria/criteria';
import { ResponseSearch } from '../../shared/domain/response/response-search';


export const contractService: ContractService = {
    ...servicesHost<NewPostContract>(axiosInstance, endpoints.contracts.root),
    searchClientById: async (): Promise<Contract[]> => {
        const { data } = await axiosInstance.get<Contract[]>(`${endpoints.contracts.client}/pending`);
        return data;
    },
    searchClient: async <NewPostContract>(criteria: Criteria): Promise<ResponseSearch<NewPostContract>> => {
        const { data } = await axiosInstance.get(`${endpoints.contracts.client}${criteriaToQueryString(criteria)}`);
        return data;
    },
    update: async (id: string, body: Partial<NewPostContract>): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.put<ResponseSuccess>(`${endpoints.contracts.root}/${id}`, body);
        return data;
    },
    finish: async (contractId: string): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.post(`${endpoints.contracts.root}/${contractId}/finish`);
        return data;
    },
    finishClient: async (contractId: string): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.post(`${endpoints.contracts.root}/${contractId}/finish/client`);
        return data;
    },
    cancel: async (contractId: string, reasonForCancellation: string): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.post(`${endpoints.contracts.root}/${contractId}/cancel`, {
            reasonForCancellation
        });
        return data;
    },
    updateFolder: async (contractId: string, folder: string, number: string): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.patch(`${endpoints.contracts.root}/${contractId}/folder`, {
            folder,
            number
        });
        return data;
    },
    updatePayment: async (contractId: string, body: ContractPayments): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.patch(`${endpoints.contracts.root}/${contractId}/payment`, body);
        return data;
    }

} 
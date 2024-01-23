import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Contract, NewContract } from '../domain/contract';
import { ContractService } from '../domain/contract.service';
import { endpoints } from '../../shared/domain/endpoint';
import { ResponseSuccess } from '../../shared/domain/response/response-success';


export const contractService: ContractService = {
    ...servicesHost<NewContract>(axiosInstance, endpoints.contracts.root),
    update: async (id: string, body: Partial<Contract>): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.patch<ResponseSuccess>(`${endpoints.contracts.root}/${id}`, body);
        return data;
    },
} 

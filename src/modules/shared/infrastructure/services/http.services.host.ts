import { AxiosInstance } from "axios";
import { ServiceHost } from "../../domain/services/services-host";
import { ResponseSuccess } from "../../domain/response/response-success";
import { ResponseSearch } from "../../domain/response/response-search";
import { Criteria, criteriaToQueryString } from "../../domain/criteria/criteria";

export function servicesHost<T>(axios: AxiosInstance, endpoint: string): ServiceHost<T> {
    return {
        save: async (body: T): Promise<ResponseSuccess> => {
            const { data } = await axios.post<ResponseSuccess>(`${endpoint}`, body);
            return data;
        },
        search: async <R>(criteria: Criteria): Promise<ResponseSearch<R>> => {
            const { data } = await axios.get(`${endpoint}${criteriaToQueryString(criteria)}`);
            return data;
        },
        searchById: async <R>(id: string): Promise<R> => {
            const { data } = await axios.get(`${endpoint}/${id}`);
            return data;
        },
        update: async (id: string, body: T): Promise<ResponseSuccess> => {
            const { data } = await axios.put<ResponseSuccess>(`${endpoint}/${id}`, body);
            return data;
        },
        remove: async (id: string): Promise<ResponseSuccess> => {
            const { data } = await axios.delete<ResponseSuccess>(`${endpoint}/${id}`);
            return data;
        },
    }
}
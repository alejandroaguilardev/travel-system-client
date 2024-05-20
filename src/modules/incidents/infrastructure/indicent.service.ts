import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { endpoints } from '../../shared/domain/endpoint';
import { IncidentService } from '../domain/indicent-service';
import { Criteria, criteriaToQueryString } from '../../shared/domain/criteria/criteria';
import { ResponseSearch } from '../../shared/domain/response/response-search';
import { Incident } from '../domain/incident';


export const incidentService: IncidentService = {
    search: async <Incident>(criteria: Criteria): Promise<ResponseSearch<Incident>> => {
        const { data } = await axiosInstance.get(`${endpoints.incident.root}${criteriaToQueryString(criteria)}`);
        return data;
    },
    searchById: async (id: string): Promise<Incident> => {
        const { data } = await axiosInstance.get<Incident>(`${endpoints.incident.root}/${id}`);
        return data;
    },
    searchNotification: async <Incident>(criteria: Criteria): Promise<ResponseSearch<Incident>> => {
        const { data } = await axiosInstance.get(`${endpoints.incident.notification}${criteriaToQueryString(criteria)}`);
        return data;
    },
    searchNotificationById: async (id: string): Promise<Incident> => {
        const { data } = await axiosInstance.get<Incident>(`${endpoints.incident.notification}/${id}`);
        return data;
    },
} 

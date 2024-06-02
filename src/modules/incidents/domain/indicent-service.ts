
import { Incident } from './incident';
import { ServiceSearch } from '../../shared/domain/services/service-search';

export interface IncidentService {
    search: ServiceSearch;
    searchById(id: string): Promise<Incident>;
    searchNotification: ServiceSearch;
    searchNotificationById(id: string): Promise<Incident>;
}

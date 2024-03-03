import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Cage } from '../domain/cage';
import { CageService } from '../domain/cage.service';
import { endpoints } from '../../shared/domain/endpoint';


export const cageService: CageService = {
    ...servicesHost<Cage>(axiosInstance, endpoints.cages.root),
} 

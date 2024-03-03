import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Pet } from '../domain/pet';
import { PetService } from '../domain/pet.service';
import { endpoints } from '../../shared/domain/endpoint';


export const petService: PetService = {
    ...servicesHost<Pet>(axiosInstance, endpoints.pets.root),
} 

import { ResponseSuccess } from '../../../modules/shared/domain/response/response-success';
import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { ClientPetsResponse, Pet } from '../domain/pet';
import { PetService } from '../domain/pet.service';
import { endpoints } from '../../shared/domain/endpoint';


export const petService: PetService = {
    ...servicesHost<Pet>(axiosInstance, endpoints.pets.root),
    updateChip: async (id: string, chip: string, chipDate: Date): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.patch<ResponseSuccess>(`${endpoints.pets.root}/${id}/chip`, {
            chip,
            chipDate
        });
        return data;
    },
    searchClientPets: async (adopter: string): Promise<ClientPetsResponse[]> => {
        const { data } = await axiosInstance.get<ClientPetsResponse[]>(`${endpoints.pets.root}/${adopter}/pets`);
        return data;
    },

} 

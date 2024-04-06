import { ResponseSuccess } from '../../../modules/shared/domain/response/response-success';
import { servicesHost } from '../../shared/infrastructure/services/http.services.host';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Pet, TopicoMeasurementsAndWeight } from '../domain/pet';
import { PetService } from '../domain/pet.service';
import { endpoints } from '../../shared/domain/endpoint';


export const petService: PetService = {
    ...servicesHost<Pet>(axiosInstance, endpoints.pets.root),
    updateMeasurementsAndWeight: async (id: string, body: TopicoMeasurementsAndWeight): Promise<Pet> => {
        const { data } = await axiosInstance.patch<Pet>(`${endpoints.pets.root}/${id}/measurement`, body);
        return data;
    },
    updateChip: async (id: string, chip: string, chipDate: Date): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.patch<ResponseSuccess>(`${endpoints.pets.root}/${id}/chip`, {
            chip,
            chipDate
        });
        return data;
    }

} 

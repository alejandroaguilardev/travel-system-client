import { ServiceHost } from '../../shared/domain/services/services-host';
import { Pet, TopicoMeasurementsAndWeight } from './pet';

export interface PetService extends ServiceHost<Pet> {
    updateMeasurementsAndWeight(id: string, body: TopicoMeasurementsAndWeight): Promise<ResponseSuccess>;
    updateChip(id: string, chip: string, chipDate: Date): Promise<ResponseSuccess>;
}
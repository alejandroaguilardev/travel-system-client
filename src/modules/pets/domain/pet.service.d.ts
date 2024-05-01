import { ServiceHost } from '../../shared/domain/services/services-host';
import { Pet, TopicoMeasurementsAndWeight } from './pet';

export interface PetService extends ServiceHost<Pet> {
    updateChip(id: string, chip: string, chipDate: Date): Promise<ResponseSuccess>;
}
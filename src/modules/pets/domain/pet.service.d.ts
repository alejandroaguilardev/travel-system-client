import { ServiceHost } from '../../shared/domain/services/services-host';
import { Pet } from './pet';

export interface PetService extends ServiceHost<Pet> { }
import { ContractServices } from './contract-services/services';
import { ContractStatus } from './contract-status';
import { User } from '../../users/domain/user';
import { Documentation } from './contract-services/documentation/documentation';
import { Cage } from './contract-services/cage/cage';
import { Pet } from '../../pets/domain/pet';
import { TypeTraveling } from './contract-services/travel/contract-travel';

export interface Contract {
    id: string;
    number: string;
    client: User;
    status: ContractStatus;
    startDate: Date;
    endDate: Date | null;
    services: ContractServices;
    guideNumber: string;
    pets: Pet[];
}

export interface NewContract extends Omit<Contract, "id" | "guideNumber" | "services" | "endDate" | "pets" | "client" | "guideNumber" | "status"> {
    id?: string;
    client: string;
    pets?: string[];
    cage?: Cage;
    documentation: Documentation
    travel: {
        hasServiceIncluded: boolean,
        hasServiceAccompanied: boolean;
        typeTraveling: TypeTraveling;
    }
}

export interface UpdateContract extends Omit<Contract, "client" | "pets"> {
    client: string;
    pets: string[]
}

import { ServicesDefinition } from './interfaces/services';
import { StatusDefinition } from './contract-status';
import { User } from '../../users/domain/user';
import { DocumentationDefinition } from './interfaces/documentation';
import { CageDefinition } from './interfaces/cage';
import { TypeTraveling } from './travel/contract-travel';

export interface Contract {
    id: string;
    number: string;
    client: User;
    status: StatusDefinition;
    startDate: Date;
    endDate: Date | null;
    services: ServicesDefinition;
    guideNumber: string;
    pets: string[];
}

export interface NewContract extends Omit<Contract, "id" | "guideNumber" | "services" | "endDate" | "pets" | "client" | "guideNumber" | "status"> {
    id?: string;
    client: string;
    pets?: string[];
    cage?: CageDefinition;
    documentation: DocumentationDefinition
    travel: {
        hasServiceIncluded: boolean,
        typeTraveling: TypeTraveling;
    }
}

export interface UpdateContract extends Omit<Contract, "client" | "pets"> {
    client: string;
    pets: string[]
}

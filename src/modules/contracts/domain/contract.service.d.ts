import { ServiceHost } from '../../shared/domain/services/services-host';
import { Contract, NewContract } from './contract';
import { CageDefinition } from './interfaces/cage';
import { DocumentationDefinition } from './interfaces/documentation';
import { PartialTravelDefinition } from './interfaces/travel';

export interface ContractService extends ServiceHost<NewContract> {
    update(id: string, body: Partial<NewContract>): Promise<ResponseSuccess>;
    searchClientById(clientId: string): Promise<Contract[]>;
    updateDocumentationClient(contractId: string, documentation: DocumentationDefinition): Promise<Contract>;
    updateCage(contractId: string, cage: CageDefinition): Promise<Contract>;
    updateTravel(contractId: string, cage: PartialTravelDefinition): Promise<Contract>;
    finish(contractId: string): Promise<ResponseSuccess>;
}

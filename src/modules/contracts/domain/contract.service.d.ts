import { ServiceHost } from '../../shared/domain/services/services-host';
import { Contract, NewContract } from './contract';
import { DocumentationDefinition } from './interfaces/documentation';

export interface ContractService extends ServiceHost<NewContract> {
    update(id: string, body: Partial<NewContract>): Promise<ResponseSuccess>;
    searchClientById(clientId: string): Promise<Contract[]>;
    updateDocumentationClient(contractId: string, documentation: DocumentationDefinition): Promise<Contract>;

}

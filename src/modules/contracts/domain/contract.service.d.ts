import { ServiceHost } from '../../shared/domain/services/services-host';
import { Contract, NewContract } from './contract';
import { Cage } from './contract-services/cage/cage';
import { Documentation } from './contract-services/documentation/documentation';
import { PartialTravel } from './travel/travel';

export interface ContractService extends ServiceHost<NewContract> {
    update(id: string, body: Partial<NewContract>): Promise<ResponseSuccess>;
    searchClientById(clientId: string): Promise<Contract[]>;
    updateDocumentation(contractId: string, documentation: Documentation): Promise<Contract>;
    updateCage(contractId: string, cage: Cage): Promise<Contract>;
    updateTravel(contractId: string, cage: PartialTravel): Promise<Contract>;
    finish(contractId: string): Promise<ResponseSuccess>;
}

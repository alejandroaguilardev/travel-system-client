import { ServiceHost } from '../../shared/domain/services/services-host';
import { Contract, NewPostContract } from './contract';
import { ContractDetail } from './contract-detail';
import { Cage } from './contract-services/cage/cage';
import { Documentation } from './contract-services/documentation/documentation';
import { PartialTravel } from './travel/travel';
import { ServiceSearch } from '../../shared/domain/services/service-search';

export interface ContractService extends ServiceHost<NewPostContract> {
    update(id: string, body: Partial<NewPostContract>): Promise<ResponseSuccess>;
    searchClientById(): Promise<Contract[]>;
    searchClient: ServiceSearch;
    finish(contractId: string): Promise<ResponseSuccess>;
    finishClient(contractId: string): Promise<ResponseSuccess>;
    cancel(contractId: string): Promise<ResponseSuccess>;
    updateFolder(contractId: string, folder: string, number: string): Promise<ResponseSuccess>
}

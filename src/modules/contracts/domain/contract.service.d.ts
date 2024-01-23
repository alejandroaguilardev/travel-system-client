import { ServiceHost } from '../../shared/domain/services/services-host';
import { Contract, NewContract } from './contract';

export interface ContractService extends ServiceHost<NewContract> {
    update(id: string, body: Partial<Contract>): Promise<ResponseSuccess>;

}

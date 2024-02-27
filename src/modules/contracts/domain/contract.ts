import { ContractStatus } from './contract-status';
import { User } from '../../users/domain/user';
import { ContractDetail, NewContractDetail, NewPostContractDetail } from './contract-detail';

export interface Contract {
    id: string;
    number: string;
    client: User;
    status: ContractStatus;
    startDate: Date;
    endDate: Date;
    details: ContractDetail[];
    user: string;
}

export interface NewContract extends Omit<Contract, "id" | "endDate" | "client" | "guideNumber" | "status" | "details" | "user"> {
    id?: string;
    client: string;
    details: NewContractDetail[]
}
export interface NewPostContract extends Omit<NewContract, "details"> {
    details: NewPostContractDetail[]
}

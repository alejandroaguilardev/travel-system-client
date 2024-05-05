import { ContractDetailStatus } from './contract-status';
import { User } from '../../users/domain/user';
import { ContractDetail, NewContractDetail, NewPostContractDetail } from './contract-detail';
import { PayInInstallment } from './payment-summary';

export interface ContractStatus {
    petTravel: ContractDetailStatus,
    client: ContractDetailStatus,
}
export interface Contract extends ContractPayments {
    id: string;
    correlative?: number;
    folder: string;
    number: string;
    client: User;
    status: ContractStatus;
    startDate: Date;
    estimatedDate: Date;
    endDate: Date | null;
    details: ContractDetail[];
    adviser: User;
    price: number;
    format: string;
    finishClient?: boolean;
    reasonForCancellation?: string;
    user: string;
}

export interface NewContract extends Omit<Contract, "id" | "endDate" | "client" | "status" | "correlative" | "details" | "user" | "folder" | "number" | "adviser" | "finishClient"> {
    id?: string;
    client: string;
    details: NewContractDetail[];
    folder?: string;
    number?: string;
    user?: string;
    adviser: string;
}
export interface NewPostContract extends Omit<NewContract, "details"> {
    details: NewPostContractDetail[]
}

export interface ContractPayments {
    payInInstallments?: PayInInstallment[];
}



export const correlativeToString = (value?: number): string => {
    if (!value) return '';
    return value.toString().padStart(8, '0');
} 
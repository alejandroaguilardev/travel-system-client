import { ContractStatus } from './contract-status';
import { User } from '../../users/domain/user';
import { ContractDetail, NewContractDetail, NewPostContractDetail } from './contract-detail';
import { CustomerPayment } from './customer-payments';
import { PayInInstallment } from './payment-summary';

export interface Contract extends ContractPayments {
    id: string;
    folder: string;
    number: string;
    client: User;
    status: ContractStatus;
    startDate: Date;
    endDate: Date | null;
    details: ContractDetail[];
    adviser: User;
    price: number;
    format: string;
    finishClient?: boolean;
    reasonForCancellation?: string;
    user: string;
}

export interface NewContract extends Omit<Contract, "id" | "endDate" | "client" | "status" | "details" | "user" | "folder" | "number" | "adviser" | "finishClient"> {
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



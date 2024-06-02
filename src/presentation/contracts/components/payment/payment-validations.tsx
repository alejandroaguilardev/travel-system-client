import * as Yup from 'yup';
import { ContractPayments } from '../../../../modules/contracts/domain/contract';

export const defaultValues: ContractPayments = {
    payInInstallments: [],
};

export const contractPaymentsSchema: Yup.ObjectSchema<ContractPayments> = Yup.object().shape({
    payInInstallments: Yup.array(),
});



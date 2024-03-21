import * as Yup from 'yup';
import { ContractTopico } from '../../../../modules/contracts/domain/contract-services/topico/contract-topico';

export const topicoSchema: Yup.ObjectSchema<ContractTopico> = Yup.object().shape({

});


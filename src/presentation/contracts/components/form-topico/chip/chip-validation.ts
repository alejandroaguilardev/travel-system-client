import * as Yup from 'yup';
import { ChipContract, hasIncludedServiceTopico } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { chipValidationYup } from '../../../../pets/components/form/pet-validations';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { Contract } from '../../../../../modules/contracts/domain/contract';



export const defaultChip = {
    hasIncluded: false,
    executed: false,
    date: new Date(),
    description: '',
    observation: '',
    user: '',

};

export const chipObjectSchema: Yup.ObjectSchema<ChipContract> = Yup.object().shape({
    hasIncluded: Yup.boolean(),
    executed: Yup.boolean(),
    date: Yup.date(),
    description: chipValidationYup.test(
        'is-true',
        'El chip es requerido',
        function (value) {
            const { executed } = this.parent;
            if (!value && executed) return false;
            return true
        }
    ),
    observation: Yup.string(),
    user: Yup.string(),
});


export const petDefaultValues = (contract: Contract, detail: ContractDetail) => {
    const chip = detail?.topico?.chip;
    const dataExits = detail?.pet?.topico?.chip;
    const chipDefault = detail?.pet?.chip || defaultChip.description;

    if (hasIncludedServiceTopico(contract, detail, "chip", "chipCertificate")) {
        return {
            hasIncluded: detail.topico?.chip?.hasIncluded || defaultChip.hasIncluded,
            executed: chip?.executed || defaultChip.executed,
            date: chip?.date || defaultChip.date,
            description: chip?.description || chipDefault,
            observation: chip?.observation || defaultChip.observation,
            user: chip?.user || defaultChip.user,
        }
    }

    const detailDataExits = { ...detail, topico: detail?.pet?.topico } as ContractDetail;
    if (hasIncludedServiceTopico(contract, detailDataExits, "chip", "chipCertificate")) {
        return {
            hasIncluded: detail.topico?.chip?.hasIncluded || defaultChip.hasIncluded,
            executed: dataExits?.executed || defaultChip.executed,
            date: dataExits?.date || defaultChip.date,
            description: dataExits?.description || chipDefault,
            observation: dataExits?.observation || defaultChip.observation,
            user: dataExits?.user || defaultChip.user
        }
    }
    return defaultChip;
}
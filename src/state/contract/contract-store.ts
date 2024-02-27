import { create } from "zustand";
import { Contract } from '../../modules/contracts/domain/contract';
import { ContractDetail } from '../../modules/contracts/domain/contract-detail';

type Props = {
    contract: Contract | null,
    contractDetail: ContractDetail | null,
    onSelected: (contract: Contract | null) => void;
    onSelectedDetail: (contractDetail: ContractDetail | null) => void;
    onReset: () => void;
}

export const useContractStore = create<Props>()(
    (set) => ({
        contract: null,
        contractDetail: null,
        onSelected: (contract) => {
            set((state) => ({
                ...state,
                contract,
            }))
        },
        onSelectedDetail: (contractDetail) => {
            set((state) => ({
                ...state,
                contractDetail,
            }))
        },
        onReset: () => {
            set((state) => ({
                ...state,
                contract: null,
                contractDetail: null,
            }))
        },
    }),
);
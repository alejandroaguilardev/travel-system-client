import { create } from "zustand";
import { Contract } from '../../modules/contracts/domain/contract';

type Props = {
    contract: Contract | null,
    onSelected: (contract: Contract | null) => void;
    onReset: () => void;
}

export const useContractStore = create<Props>()(
    (set) => ({
        contract: null,
        onSelected: (contract) => {
            set((state) => ({
                ...state,
                contract,
            }))
        },
        onReset: () => {
            set((state) => ({
                ...state,
                contract: null,
            }))
        },
    }),
);
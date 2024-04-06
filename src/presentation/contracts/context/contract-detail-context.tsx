import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Contract } from '../../../modules/contracts/domain/contract';

export interface DetailInfoContextProps {
    contract: Contract;
    handleChangeContractInfo: (newValue: Contract) => void;
}

export const DetailInfoContext = createContext<DetailInfoContextProps>({} as DetailInfoContextProps);



export const DetailInfoProvider = ({ children, defaultContract }: { defaultContract: Contract, children: React.ReactNode }) => {
    const [contract, setContract] = useState<Contract>(defaultContract);


    const handleChangeContractInfo = useCallback((newValue: Contract) => {
        setContract(newValue);
    }, []);

    const memo: DetailInfoContextProps = useMemo(() => ({
        contract,
        handleChangeContractInfo,
    }), [contract, handleChangeContractInfo])



    return (
        <DetailInfoContext.Provider value={memo}>
            {children}
        </DetailInfoContext.Provider>
    );
};

export const useDetailInfoContext = () => {
    const context = useContext(DetailInfoContext);
    if (!context?.contract) {
        throw new Error('useDetailInfoContext must be used within a DetailInfoProvider');
    }
    return context;
};

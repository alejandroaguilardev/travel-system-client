import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ContractDetail } from '../../../modules/contracts/domain/contract-detail';

export interface TabContextProps {
    detail: ContractDetail;
    handleChangeDetailInfo: (newValue: ContractDetail) => void;
}

export const DetailInfoContext = createContext<TabContextProps | undefined>(undefined);



export const DetailInfoProvider = ({ defaultValue, children }: { defaultValue: ContractDetail, children: React.ReactNode }) => {
    const [detail, setCurrentTab] = useState<ContractDetail>(defaultValue);

    const handleChangeDetailInfo = useCallback((newValue: ContractDetail) => {
        setCurrentTab(newValue);
    }, []);

    const memo: TabContextProps = useMemo(() => ({
        handleChangeDetailInfo,
        detail
    }), [detail, handleChangeDetailInfo])



    return (
        <DetailInfoContext.Provider value={memo}>
            {children}
        </DetailInfoContext.Provider>
    );
};

export const useDetailInfoContext = () => {
    const context = useContext(DetailInfoContext);
    if (!context?.detail) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
};

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ContractDetail } from '../../../modules/contracts/domain/contract-detail';

export interface TabContextProps {
    detail: ContractDetail;
    handleChangeTopico: (newValue: ContractDetail) => void;
}

export const TopicoContext = createContext<TabContextProps | undefined>(undefined);



export const TopicoProvider = ({ defaultValue, children }: { defaultValue: ContractDetail, children: React.ReactNode }) => {
    const [detail, setCurrentTab] = useState<ContractDetail>(defaultValue);

    const handleChangeTopico = useCallback((newValue: ContractDetail) => {
        setCurrentTab(newValue);
    }, []);

    const memo: TabContextProps = useMemo(() => ({
        handleChangeTopico,
        detail
    }), [detail, handleChangeTopico])



    return (
        <TopicoContext.Provider value={memo}>
            {children}
        </TopicoContext.Provider>
    );
};

export const useTopicoContext = () => {
    const context = useContext(TopicoContext);
    if (!context?.detail) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
};

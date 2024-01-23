import { useContext } from "react";
import { TabGenericContext } from "./tab-generic-context";

export const useTabContext = () => {
    const context = useContext(TabGenericContext);
    if (!context?.changeTab) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
};

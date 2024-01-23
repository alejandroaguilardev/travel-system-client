import { createContext } from 'react';

export interface TabContextProps {
    currentTab: string;
    changeTab: (newValue: string) => void;
}

export const TabGenericContext = createContext<TabContextProps | undefined>(undefined);



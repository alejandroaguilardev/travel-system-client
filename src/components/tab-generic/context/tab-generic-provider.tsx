import { useCallback, useMemo, useState } from "react";
import { TabContextProps, TabGenericContext } from "./tab-generic-context";

export const TabGenericProvider = ({ defaultValue, children }: { defaultValue: string, children: React.ReactNode }) => {
    const [currentTab, setCurrentTab] = useState(defaultValue);

    const changeTab = useCallback((newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const tabGenericContext: TabContextProps = useMemo(() => ({
        changeTab,
        currentTab
    }), [currentTab, changeTab])



    return (
        <TabGenericContext.Provider value={tabGenericContext}>
            {children}
        </TabGenericContext.Provider>
    );
};
'use client';

import React from "react";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTabContext } from "./context/use-tab-context";

interface TabDefinition {
    label?: React.ReactNode;
    value: string;
    component: React.ReactNode;
}

interface TabSwitcherProps {
    tabs: TabDefinition[];
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs }) => {
    const { currentTab, changeTab } = useTabContext();

    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        changeTab(newValue);
    };

    return (
        <TabContext value={currentTab}>
            <TabList onChange={handleChangeTab}>
                {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab?.label ?? tab.value} value={tab.value} />
                ))}
            </TabList>

            {tabs.map((tab) => (
                <TabPanel key={tab.value} value={tab.value}>
                    {tab.component}
                </TabPanel>
            ))}
        </TabContext>
    );
};
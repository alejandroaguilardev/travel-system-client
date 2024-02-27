import { ReactNode } from "react";

export type StepType = {
    value: string;
    component: ReactNode,
    icon: ReactNode,
    handleNext?: (setActiveStep: React.Dispatch<React.SetStateAction<number>>) => void | Promise<void>,
}

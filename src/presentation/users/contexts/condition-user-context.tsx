import { ReactNode, createContext, useContext } from "react"

type ConditionUserContextTypes = {
    isUser: boolean;
}

type Props = {
    children: ReactNode;
    isUser: boolean;
}

const ConditionUserContext = createContext<ConditionUserContextTypes>({} as ConditionUserContextTypes);

export const ConditionUserProvider = ({ children, isUser }: Props) => {
    return (
        <ConditionUserContext.Provider value={{ isUser }}>
            {children}
        </ConditionUserContext.Provider>
    )
}


export const useConditionContext = () => {
    const context = useContext(ConditionUserContext);
    if (context.isUser === undefined) throw new Error("No esta declarado el ConditionUserContext");

    return context
}
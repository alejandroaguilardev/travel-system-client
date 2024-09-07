import React, { createContext, useContext, useState } from 'react';

interface DialogContextType {
    isOpen: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    return (
        <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    );
};

export const useContextDialog = (): DialogContextType => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

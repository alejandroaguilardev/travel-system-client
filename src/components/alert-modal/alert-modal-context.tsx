import { ReactNode, createContext, useContext, useState, useCallback, useMemo } from 'react';
import AlertModal from './alert-modal';

export interface ShowNotification {
    newSeverity?: 'success' | 'info' | 'warning' | 'error',
    newTitle?: string,
    newMessage?: string,
}

interface NotificationContextType {
    open: boolean;
    showNotification: (params: ShowNotification) => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
    open: false,
    showNotification: () => { },
    hideNotification: () => { },
});

const AlertModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    const showNotification = useCallback(({
        newTitle = "Operación realizada satisfactoriamente",
        newMessage = "La acción que solicitaste ha sido completada exitosamente.",
        newSeverity = "success",
    }: ShowNotification) => {
        setOpen(true);
        setSeverity(newSeverity);
        setMessage(newMessage);
        setTitle(newTitle);
    }, []);

    const hideNotification = useCallback(() => {
        setOpen(false);
    }, [])

    const memo = useMemo(() => ({ open, showNotification, hideNotification }), [open, showNotification, hideNotification])

    return (
        <NotificationContext.Provider value={memo}>
            {children}
            <AlertModal
                title={title}
                message={message}
                severity={severity}
                open={open}
                onClose={hideNotification}
            />
        </NotificationContext.Provider>
    );
};


const useAlertModalContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useAlertModalContext must be used within a TabProvider');
    }
    return context;

};
export { AlertModalProvider, NotificationContext, useAlertModalContext };
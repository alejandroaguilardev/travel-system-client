import { useCallback } from "react";
import { useSnackbar, SnackbarKey, SnackbarMessage, OptionsObject } from "notistack";

export const useMessage = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showNotification = useCallback((
        message: SnackbarMessage,
        options?: OptionsObject
    ) => {
        const { variant = "success" } = options ?? {};
        if (typeof message === "string") {
            return enqueueSnackbar(message, { ...options, variant });
        }
        return false;
    }, [enqueueSnackbar]);

    const closeNotification = useCallback((key: SnackbarKey) => {
        closeSnackbar(key);
    }, [closeSnackbar]);

    return {
        showNotification,
        closeNotification,
    };
};

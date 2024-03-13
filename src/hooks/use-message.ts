import { useCallback } from "react";
import { useSnackbar, SnackbarKey, SnackbarMessage, OptionsObject } from "notistack";
import { ShowNotification, useAlertModalContext } from "../components/alert-modal/alert-modal-context";


export const useMessage = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { showNotification: showNotificationModal, } = useAlertModalContext();

    const showNotification = useCallback((
        message: SnackbarMessage,
        options?: OptionsObject
    ) => {
        const { variant = "success" } = options ?? {};
        if (typeof message === "string") {
            return enqueueSnackbar(message, {
                ...options, variant, anchorOrigin: {
                    horizontal: "right", vertical: "top"
                }
            });
        }
        return false;
    }, [enqueueSnackbar]);

    const closeNotification = useCallback((key: SnackbarKey) => {
        closeSnackbar(key);
    }, [closeSnackbar]);

    const showSuccess = (params: ShowNotification) => {
        showNotificationModal(params);
    }


    return {
        showNotification,
        closeNotification,
        showSuccess,
    };
};



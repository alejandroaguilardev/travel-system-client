import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
export const errorsShowNotification = (error: any, showNotification: (message: SnackbarMessage, options?: OptionsObject) => false | SnackbarKey) => {
    if (typeof error?.message === "string") {
        showNotification(error.message, { variant: error?.variant ?? "error" });
        return;
    }

    if (Array.isArray(error?.message)) {
        error.message.forEach((message: string) => {
            showNotification(message, { variant: error?.variant ?? "error" });

        })
        return;
    }

    return showNotification("Ha ocurrido un error no controlado, intente nuevamente", { variant: "error" });
}
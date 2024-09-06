import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Alert, AlertProps } from "@mui/material";

interface Props extends AlertProps {
    name: string;
}

export const ErrorMessage: FC<Props> = ({ name, ...rest }) => {
    const { formState } = useFormContext();
    const { errors } = formState;

    // Convertir 'name' en un array de claves si contiene puntos
    const value = name.includes(".") ? name.split(".") : [name];

    // Acceder al mensaje de error utilizando el array de claves
    const errorMessage = value.reduce((acc, key) => {
        return acc && acc[key];
    }, errors as any);

    return (
        <>
            {errorMessage?.message && (
                <Alert severity='error' {...rest}>
                    {String(errorMessage.message) ?? ""}
                </Alert>
            )}
        </>
    );
};

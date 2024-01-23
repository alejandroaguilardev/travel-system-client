import { FC } from "react";
import { useFormContext } from "react-hook-form"
import { Alert, AlertProps } from "@mui/material";

interface Props extends AlertProps {
    name: string;
}

export const ErrorMessage: FC<Props> = ({ name, ...rest }) => {
    const { formState } = useFormContext();
    const { errors } = formState;

    return (
        <>
            {errors?.[name]?.message && (
                <Alert severity='error' {...rest}>
                    {String(errors?.[name]?.message) ?? ""}
                </Alert>
            )}
        </>
    )
}

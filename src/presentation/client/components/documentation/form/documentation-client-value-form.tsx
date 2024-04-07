import { useFormContext } from "react-hook-form";
import { CSSProperties, FC, useEffect } from "react";
import { Alert, Box, Stack, Typography } from "@mui/material"
import { RHFSwitch, RHFCheckbox } from "src/components/hook-form";
import { useAuthContext } from "src/presentation/auth/hooks";


type Props = {
    name: string;
    label: string;
    edit?: boolean;
    style?: CSSProperties;
    noExecutionDate?: boolean;
    canOptional?: boolean;
}

export const DocumentationClientValueForm: FC<Props> = ({ name, label, edit, canOptional, noExecutionDate = false, style = {} }) => {
    const { watch, setValue } = useFormContext();
    const { user } = useAuthContext();
    const hasServiceIncluded = watch(`${name}.hasServiceIncluded`);
    const isApplied = watch(`${name}.isApplied`);
    const executionDate = watch(`${name}.executionDate`);
    const isRequired = watch(`${name}.isRequired`);

    useEffect(() => {
        if (!hasServiceIncluded) {
            setValue(`${name}.expectedDate`, new Date());
        }
    }, [hasServiceIncluded])

    useEffect(() => {
        if (!isApplied) {
            setValue(`${name}.executionDate`, null);
            setValue(`${name}.user`, "");
        }
        if (isApplied && !executionDate) {
            setValue(`${name}.executionDate`, new Date());
            setValue(`${name}.user`, user?.id);
        }
    }, [isApplied])

    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} width="100%" mb={hasServiceIncluded ? 1 : 0}>
            <Alert sx={{
                boxShadow: 4,
                width: "100%",
            }}
                severity={isApplied ? "success" : "error"}
                icon={false}
            >
                <Box fontWeight="bold" display="flex" alignItems="center" >
                    {label}
                    <Typography
                        sx={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: 10,
                            marginLeft: 1,

                        }}
                    >{`${isRequired ? "requerido (*)" : ''} `}</Typography>
                </Box>
                {
                    !hasServiceIncluded &&
                    <RHFSwitch
                        name={`${name}.isApplied`}
                        label={`Confirma que dispones del ${label.toLowerCase()}`}
                    />
                }
            </Alert>
        </Stack >
    )
}

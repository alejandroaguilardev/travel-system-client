import { useFormContext } from "react-hook-form";
import { CSSProperties, FC } from "react";
import { Box, Stack } from "@mui/material"
import RHFSwitch from '../../../../../../components/hook-form/rhf-switch';

type Props = {
    name: string;
    label: string;
    style?: CSSProperties;
    noExecutionDate?: boolean;
    canOptional?: boolean;
}

export const TopicoSwitch: FC<Props> = ({ name, label, style = {} }) => {

    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} width="100%">
            <Box display="flex" width="100%" justifyContent="space-evenly">
                <RHFSwitch
                    name={`${name}.hasIncluded`}
                    label={label}
                    sx={{
                        width: "100%",
                    }}
                    style={style}
                />
            </Box>
        </Stack>
    )
}

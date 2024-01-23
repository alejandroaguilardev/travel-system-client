import { Paper, useTheme } from "@mui/material";
import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode;
}

export const PaperCustom: FC<Props> = ({ children }) => {
    const theme = useTheme();

    return (
        <Paper sx={{
            padding: theme.spacing(3),
            margin: theme.spacing(2),
            maxWidth: '100%',
        }}>
            {children}
        </Paper>
    )
}

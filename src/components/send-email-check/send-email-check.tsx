import { FC } from "react";
import { Alert, Checkbox, FormControlLabel, Switch } from "@mui/material";

type Props = {
    label?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export const SendEmailCheck: FC<Props> = ({ label = "Enviar correo", value, onChange }) => {

    return (
        <Alert severity="warning" icon={false} sx={{ mb: 2, width: "100%" }} >
            <FormControlLabel
                label={label}
                control={<Checkbox checked={value} onChange={() => onChange(!value)} />}
            />
        </Alert>
    )
}

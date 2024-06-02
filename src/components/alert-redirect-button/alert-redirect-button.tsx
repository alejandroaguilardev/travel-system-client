import { Alert, Button, Link, AlertColor, Box } from "@mui/material";
import RouterLink from '../../app/routes/components/router-link';

type Props = {
    alert: {
        label: string;
        color: AlertColor;
    },
    button: {
        label: string;
        redirect: string;
    },
}

export const AlertRedirectButton = ({ alert, button }: Props) => {
    return (
        <Box gap={1} display="flex" flexDirection="column">
            <Alert severity={alert.color}>{alert.label}</Alert>
            <Link component={RouterLink} href={button.redirect}>
                <Button type="button" variant="outlined" fullWidth>
                    {button.label}
                </Button>
            </Link>
        </Box>
    )
}

import { FC } from "react";
import { Button, Link } from "@mui/material"

type Props = {
    url: string;
    text: string;
}

export const ContactWhatsApp: FC<Props> = ({ url, text }) => {
    return (
        <Link href={url} target='_blank' rel="noopener noreferrer" color="inherit" sx={{ typography: 'subtitle2' }} display={{ xs: "none", md: "inherit" }}>
            <Button type="button" color="success" variant="contained" fullWidth>
                {text}
            </Button>
        </Link>
    )
}

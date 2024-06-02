import { Alert, Link } from "@mui/material"

type Props = {
    number: string | null;
}

export const CommunicateAdviser = ({ number }: Props) => {
    return (
        <>
            {number &&
                <Link href={`https://wa.me/${number}?text=`} rel="noopener noreferrer" target="_blank">
                    <Alert severity="info">
                        Comuníquese con su  asesor si la información no es la correcta
                    </Alert>
                </Link>

            }
        </>
    )
}

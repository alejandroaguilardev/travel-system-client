import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { LoadingButton } from "@mui/lab"
import { Box, Button, Grid } from "@mui/material"
import { useRouter } from '../../app/routes/hooks/use-router';

type Props = {
    name: string;
    edit: boolean;
    onCancel?: () => void;
    notReload?: boolean;
    fullWidth?: boolean;
    notCancel?: boolean;
}

export const ActionsButtonsForm: FC<Props> = ({ edit, name, notReload, onCancel, fullWidth = false, notCancel = false }) => {
    const { back } = useRouter();
    const { formState } = useFormContext();
    const { isSubmitting } = formState;


    const handleCancelClick = () => {
        onCancel ? onCancel() : back();
    }

    return (
        <Grid container>
            <Grid item xs={12} md={fullWidth ? 12 : 4} />
            <Grid item xs={12} md={fullWidth ? 12 : 8}>
                <Box display="flex" gap={1} justifyContent="end">
                    {!notCancel &&
                        <Button variant="outlined" disabled={isSubmitting} fullWidth onClick={handleCancelClick} >
                            Cancelar
                        </Button>

                    }
                    {
                        !notReload &&
                        <LoadingButton type="submit" variant="contained" disabled={isSubmitting} fullWidth value="reload">
                            {edit ? "Actualizar y continuar con la edición" : "Guardar y agregar otro"}
                        </LoadingButton>
                    }
                    <LoadingButton type="submit" variant="contained" disabled={isSubmitting} fullWidth value="submit">
                        {edit ? "Actualizar" : "Guardar"} {name}
                    </LoadingButton>
                </Box>
            </Grid>
        </Grid>
    )
}

import { ReactNode } from 'react'
import { Button } from '@mui/material';
import { useBoolean } from '../../hooks/use-boolean';
import { DialogDelete } from './delete-dialog-button';

interface Props {
    onDelete: () => void;
    onCancel?: () => void;
    title?: string;
    description?: string;
    isSubmitting: boolean;
    children?: ReactNode;
}

export const DeleteItemButton = ({ title, description, isSubmitting, onDelete, onCancel, children = "Eliminar" }: Props) => {
    const { value, onTrue, onFalse } = useBoolean();
    return (
        <>
            <Button type="button" variant="contained" onClick={onTrue} color="error" disabled={isSubmitting} >
                {children}
            </Button>
            <DialogDelete
                open={value}
                onAccept={onDelete}
                onClose={onFalse}
                onCancel={onCancel}
                title={title ?? '¿Seguro que deseas continuar?'}
                description={description ?? 'Te recordamos que esta acción es irreversible, lo que significa que una vez que confirmes la eliminación, no habrá vuelta atrás y el elemento se eliminará de forma permanente.'}
            />
        </>
    )
}

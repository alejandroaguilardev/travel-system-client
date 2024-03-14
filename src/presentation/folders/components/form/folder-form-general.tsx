import { Stack } from '@mui/material';
import RHFTextField from '../../../../components/hook-form/rhf-text-field';

export const FolderFormGeneral = () => (
    <Stack spacing={1} marginBottom={1}>
        <RHFTextField
            name="name"
            label="Nombre de Folder (*)"
        />
        <RHFTextField
            name="quantity"
            label="Cantidad de Sobres (*)"
        />
    </Stack >
)


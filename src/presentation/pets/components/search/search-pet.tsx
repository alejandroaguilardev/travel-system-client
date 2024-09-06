import { Box, Button, Typography } from '@mui/material';
import { AutocompleteServer } from '../../../../components/autocomplete/selector/autocomplete-server';
import { OrderValue } from '../../../../modules/shared/domain/criteria/sorting';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { Pet } from '../../../../modules/pets/domain/pet';
import { AuthPermission, AuthGroup } from '../../../../modules/auth/domain/auth-permission';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { usePetDialogContext } from './pet-dialog-context';


export const globalFilterProperties = [
    { field: "name", value: "string" },
    { field: "race", value: "string" },
    { field: "chip", value: "string" },
    { field: "type", value: "string" }
];

const getOptionLabel = (option: Pet) => {

    const { chip } = option;
    const { name } = option;

    return `${chip} ${capitalize(name)}`;

}
type Props = {
    adopterId: string;
    pet: Pet | null;
    index: number;
    handlePet: (user: Pet) => void;
    hasCreate?: boolean;
}

export const SearchPet = ({ adopterId, index, pet, hasCreate = false, handlePet, }: Props) => {
    const { onTrue, handleIndex } = usePetDialogContext();

    return (
        <>
            <AutocompleteServer<Pet>
                collection='pets'
                defaultValue={pet}
                filters={[{ field: "adopter", value: adopterId }]}
                sorting={[{ orderBy: "name", orderType: OrderValue.ASC }]}
                globalFilterProperties={globalFilterProperties}
                callback={(value) => handlePet(value as Pet)}
                getOptionLabel={getOptionLabel}
                textField={{
                    label: "Buscar y/o ingresar  mascota ",
                    placeholder: "Nombre o chip de la mascota...",
                }}
                noOptionsText={
                    hasCreate ?
                        <Box width="100%" >
                            <PermissionGuard group={AuthGroup.PETS} permission={AuthPermission.CREATE}>
                                <Typography width="100%" textAlign="center" mb={1}>No se ha localizado a la mascota  que está buscando. ¿Desea crear una mascota ahora? </Typography>
                                <Button variant="outlined" fullWidth onClick={() => {
                                    onTrue();
                                    handleIndex(index);
                                }} sx={{
                                    fontWeight: "bold",
                                    opacity: 1
                                }}>
                                    Crear nueva mascota
                                </Button>
                            </PermissionGuard>
                        </Box>
                        : "No se ha localizado a la mascota  que está buscando. ¿Desea crear una mascota ahora?"
                }
            />
            <PermissionGuard group={AuthGroup.PETS} permission={AuthPermission.CREATE}>
                <Typography width="100%" textAlign="center" mb={1}>No se ha localizado a la mascota  que está buscando. ¿Desea crear una mascota ahora? </Typography>
                <Button variant="outlined" fullWidth onClick={() => {
                    onTrue();
                    handleIndex(index);
                }} sx={{
                    fontWeight: "bold",
                    opacity: 1
                }}>
                    Crear nueva mascota
                </Button>
            </PermissionGuard>
        </>
    )
}

import { Box, Button, Typography } from '@mui/material';
import { AutocompleteServer } from '../../../../components/autocomplete/selector/autocomplete-server';
import { OrderValue } from '../../../../modules/shared/domain/criteria/sorting';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { Pet } from '../../../../modules/pets/domain/pet';
import { AuthPermission, AuthGroup } from '../../../../modules/auth/domain/auth-permission';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { ErrorMessage } from '../../../../components/hook-form/error-message';
import { usePetDialogContext } from './pet-dialog-context';


const globalFilterProperties = [
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
    handlePet: (user: Pet) => void;
}

export const SearchPet = ({ adopterId, pet, handlePet }: Props) => {
    const { onTrue } = usePetDialogContext();

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
                    label: "Buscar y/o ingresar primera mascota ",
                    placeholder: "Nombre o chip de la mascota...",
                }}
                noOptionsText={
                    <Box width="100%" >
                        <PermissionGuard group={AuthGroup.PETS} permission={AuthPermission.CREATE}>
                            <Typography width="100%" textAlign="center" mb={1}>No se ha localizado a la mascota  que está buscando. ¿Desea crear una mascota ahora? </Typography>
                            <Button variant="outlined" fullWidth onClick={onTrue} sx={{
                                fontWeight: "bold",
                                opacity: 1
                            }}>
                                Crear nueva mascota
                            </Button>
                        </PermissionGuard>
                    </Box>
                }

            />
            <ErrorMessage name="pet" />
        </>
    )
}

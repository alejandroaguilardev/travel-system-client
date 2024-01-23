import { Checkbox, Divider, FormControlLabel, Stack, Typography } from '@mui/material';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import { useRoleFormGeneral } from './use-role-form-general';

export const RoleFormGeneral = () => {
    const { groupPermissions, selectedPermissions, handlePermissionChange, handleGroupChange } = useRoleFormGeneral();

    return (
        <Stack spacing={1} marginBottom={2}>
            <RHFTextField
                name='name'
                fullWidth
                label="Nombre (*)"
                variant="outlined"
                inputAdornment
            />

            <RHFTextField
                name='description'
                fullWidth
                label="Descripción"
                variant="outlined"
                multiline
                rows={4}
            />
            <Typography variant="h6" gutterBottom>
                Permisos del Sistema
            </Typography>

            {Object.keys(groupPermissions).map((key, index) => (
                <div key={key}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={groupPermissions[key].every(permission => selectedPermissions.includes(permission.id))}
                                onChange={() => handleGroupChange(key)}
                            />
                        }
                        label={<Typography variant="h6">{capitalize(key)}</Typography>}
                    />
                    <div>
                        {groupPermissions[key].map((permission) => (
                            <FormControlLabel
                                key={`${key}-${permission.id}`}
                                control={
                                    <Checkbox
                                        checked={selectedPermissions.includes(permission.id)}
                                        onChange={() => handlePermissionChange(permission.id)}
                                    />
                                }
                                label={<Typography>{capitalize(permission.name)}</Typography>}
                            />
                        ))}
                    </div>
                    {index < Object.keys(groupPermissions).length - 1 && <Divider />}
                </div>
            ))}
        </Stack>
    )
}

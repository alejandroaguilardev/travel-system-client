import { Stack, InputAdornment } from '@mui/material';
import { PhoneNumber } from '../../../../components/phone-number/phone-number';
import { useUserProfileForm } from './use-user-profile-form';
import Iconify from '../../../../components/iconify';

export const UserProfileForm = () => {
    const { phone, handlePhone } = useUserProfileForm();
    return (
        <Stack spacing={1} marginBottom={2}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <PhoneNumber
                    valueDefault={phone}
                    callback={handlePhone}
                    label="Teléfono (*)"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="mdi:text" />
                            </InputAdornment>
                        )
                    }}
                />
            </Stack>
        </Stack >
    )
}

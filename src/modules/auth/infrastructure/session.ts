import axios from '../../shared/infrastructure/http/axios.host';
import { jwtDecode } from '../domain/auth-token';
import { LOCAL_STORAGE_KEYS } from '../../shared/infrastructure/persistence/local-storage';

export const manageAccessToken = (accessToken: string | null): void => {
    if (accessToken) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const { exp } = jwtDecode(accessToken);
    } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
        delete axios.defaults.headers.common.Authorization;
    }
};

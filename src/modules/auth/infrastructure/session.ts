import { paths } from '../../../app/routes/paths';
import axios from '../../shared/infrastructure/http/axios.host';
import { jwtDecode } from '../domain/auth-token';
import { LOCAL_STORAGE_KEYS } from '../../shared/infrastructure/persistence/local-storage';


const sessionExpired = (exp: number): void => {
    let expiredTimer;
    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;
    clearTimeout(expiredTimer);
    expiredTimer = setTimeout(() => {
        alert('Token expired');

        sessionStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);

        window.location.href = paths.auth.login;
    }, timeLeft);
};


export const manageAccessToken = (accessToken: string | null): void => {
    if (accessToken) {
        sessionStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const { exp } = jwtDecode(accessToken);
        sessionExpired(exp);
    } else {
        sessionStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
        delete axios.defaults.headers.common.Authorization;
    }
};

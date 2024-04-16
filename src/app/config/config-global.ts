import { paths } from "../routes/paths";

export const HOST_API = import.meta.env.VITE_HOST_API;
export const RE_CAPTCHA_KEY = import.meta.env.VITE_RE_CAPTCHA;
export const PATH_AFTER_LOGIN = paths.dashboard.root;
export const PATH_AFTER_LOGIN_CLIENT = paths.root;


export const getEnvironments = () => {
    return {
        ...import.meta.env
    }
}
import { RE_CAPTCHA_KEY } from '../../../app/config/config-global';

export async function executeReCaptcha(): Promise<string> {
    return new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
            try {
                const token = await window.grecaptcha.execute(RE_CAPTCHA_KEY, { action: 'submit' });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        });
    });
}
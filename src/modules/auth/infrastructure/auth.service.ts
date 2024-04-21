import { endpoints } from '../../shared/domain/endpoint';
import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { Auth } from '../domain/auth';
import { AuthService } from '../domain/auth.service';
import { ResponseSuccess } from '../../shared/domain/response/response-success';

export const authService: AuthService = {
    login: async (document: string, documentNumber: string, password: string, tokenReCaptcha: string): Promise<Auth> => {
        const { data } = await axiosInstance.post<Auth>(endpoints.auth.root, { document, documentNumber, password }, {
            headers: {
                "g-recaptcha-response": tokenReCaptcha,
            }
        });
        return data;
    },
    verify: async (): Promise<Auth> => {
        const { data } = await axiosInstance.get<Auth>(endpoints.auth.verify);
        return data;
    },
    recover: async (email: string, tokenReCaptcha: string): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.post<ResponseSuccess>(`${endpoints.auth.root}/recover`,
            { email },
            {
                headers: {
                    "g-recaptcha-response": tokenReCaptcha,
                }
            });
        return data;
    },
    resetPassword: async (password: string): Promise<Auth> => {
        const { data } = await axiosInstance.post<Auth>(`${endpoints.auth.root}/reset-password`, { password });
        return data;
    },

} 

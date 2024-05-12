import axios from "axios";
import axiosInstance from "../http/axios.host";


export const uploadFile = async (file: File, name: string, token?: string): Promise<string> => {
    if (token) {
        const { data } = await axios.post<{ url: string }>(`uploads/file`, { file, name }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return data.url;
    }
    const { data } = await axiosInstance.post<{ url: string }>(`uploads/file`, { file, name }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data.url;
}


export const getFile = async (name: string, token?: string): Promise<{ file: any, name: string }> => {
    if (token) {
        const { data, headers } = await axios.get<{ url: string }>(`uploads/file/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: "blob"

        });
        return { file: data, name: headers["name"] };
    }
    const { data, headers } = await axiosInstance.get<{ url: string }>(`uploads/file/${name}`, {
        responseType: "blob"
    });
    return { file: data, name: headers["name"] };
} 

import axios from "axios";
import axiosInstance from "../http/axios.host";
import { HOST_ASSETS_IMAGES } from "src/app/config/config-global";

export type ImageUploadType = "private" | "public";
export type ImageGetType = "arraybuffer" | "stream";

export const uploadImage = async (file: File, name: string, route: ImageUploadType, token?: string): Promise<string> => {
    if (token) {
        const { data } = await axios.post<{ url: string }>(`uploads/image/${route}`, { file, name }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return data.url;
    }
    const { data } = await axiosInstance.post<{ url: string }>(`uploads/image/${route}`, { file, name }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data.url;
}


export const getImage = async (name: string, type: ImageGetType, protectedRoute: ImageUploadType, token?: string): Promise<{ image: any, name?: string }> => {
    const responseType = type === "arraybuffer" ? "json" : "blob";
    if (token) {
        const { data, headers } = await axios.get<{ url: string }>(`uploads/image/${name}/${type}/${protectedRoute}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType
        });
        return { image: data, name: headers?.["name"] };
    }
    const { data, headers } = await axiosInstance.get<{ url: string }>(`uploads/image/${name}/${type}/${protectedRoute}`, {
        responseType
    });
    return { image: data, name: headers?.["name"] };
}

export const getImagePublic = async (name: string) => {
    return fetch(`${HOST_ASSETS_IMAGES}/${name}`)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            return file;
        });
} 

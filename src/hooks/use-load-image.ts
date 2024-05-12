import { useEffect, useState } from "react"
import { ImageGetType, getImage, ImageUploadType } from '../modules/shared/infrastructure/upload/upload-image';


export const useLoadImage = (type: ImageGetType, protectedRoute: ImageUploadType, name?: string, token?: string) => {
    const [imageFile, setImage] = useState<string | null>(null);

    useEffect(() => {
        if (name) {
            getImage(name, type, protectedRoute, token).then(({ image }) => {
                setImage(image);
            }).catch((e) => console.log(e))
        }


    }, [name, token, type])

    return {
        imageFile,
    }
}

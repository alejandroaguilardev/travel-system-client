import { useEffect, useState } from "react"
import { getFile } from '../modules/shared/infrastructure/upload/upload-file';

export const useLoadFile = (name?: string, token?: string) => {
    const [archiveFile, setFile] = useState<{
        file: File | null,
        name: string,
    }>({
        file: null,
        name: ""
    });

    useEffect(() => {
        if (name) {
            getFile(name, token).then(({ file, name }) => {
                setFile({
                    file,
                    name
                });
            }).catch((e) => console.log(e))
        }


    }, [name, token])

    return {
        archiveFile,
    }
}

import { create } from "zustand";

type Props = {
    fileImage: File | null,
    onChangeImageFile: (value: File | null) => void;
    onResetImage: () => void;
}

export const useFileImageStore = create<Props>()(
    (set) => ({
        fileImage: null,
        onChangeImageFile: (value) => {
            let newFile = null;
            if (value) {
                newFile = Object.assign(value, {
                    preview: URL.createObjectURL(value),
                });
            }

            set((state) => ({
                ...state,
                fileImage: newFile,
            }))
        },
        onResetImage: () => {
            set((state) => ({
                ...state,
                fileImage: null,
            }))
        },
    }),
);
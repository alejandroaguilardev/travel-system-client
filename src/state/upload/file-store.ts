import { create } from "zustand";

type Props = {
    file: File | null,
    onChangeFile: (value: File | null) => void;
    onReset: () => void;
}

export const useFileStore = create<Props>()(
    (set) => ({
        file: null,
        onChangeFile: (value) => {
            let newFile = null;
            if (value) {
                newFile = Object.assign(value, {
                    preview: URL.createObjectURL(value),
                });
            }

            set((state) => ({
                ...state,
                file: newFile,
            }))
        },
        onReset: () => {
            set((state) => ({
                ...state,
                file: null,
            }))
        },
    }),
);
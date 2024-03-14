export interface Folder {
    id: string;
    name: string;
    quantity: number;
    user?: string;
}

export interface NewFolder extends Omit<Folder, "id"> {
    id?: string,
}
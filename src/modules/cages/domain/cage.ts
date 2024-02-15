export interface Cage {
    id: string;
    typeCage: string;
    modelCage: string;
    dimensionsCage: string;
    user?: string;
}

export interface NewCage extends Omit<Cage, "id"> {
    id?: string,
}
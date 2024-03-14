import { Folder } from '../../../../modules/folders/domain/folder';

interface FilterProperty {
    field: keyof Folder;
    value: string;
}

export const folderGlobalFilterProperties: FilterProperty[] = [
    { field: "name", value: "string" },
    { field: "quantity", value: "string" },
];
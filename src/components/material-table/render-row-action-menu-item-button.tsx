import { ReactNode } from "react";
import { MenuItem } from "@mui/material";
import IconWrapper from '../icon-wrapper/icon-wrapper';
import { IconKeys } from '../icon-wrapper/icon-wrapper';


type Props<T> = {
    row: T;
    item: {
        name: string,
        icon: IconKeys,
    };
    onSelected: (value: T) => void;
};

export function RenderRowActionMenuItemButton<T>({ item, onSelected, row }: Props<T>): ReactNode {
    return (
        <MenuItem onClick={() => onSelected(row)} key={item.name} sx={{ textDecoration: 'none', color: 'inherit', py: 2 }}>
            <IconWrapper icon={item.icon} mr={2} />
            {item.name}
        </MenuItem >
    )
}

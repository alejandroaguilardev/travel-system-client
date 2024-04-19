import { ReactNode } from "react";
import { MenuItem, Link, SxProps } from "@mui/material";
import RouterLink from '../../app/routes/components/router-link';
import IconWrapper from '../icon-wrapper/icon-wrapper';
import { IconKeys } from '../icon-wrapper/icon-wrapper';

type ItemRenderRowActionMenuItems = {
    name: string,
    icon: IconKeys,
    href: string,
}

type Props = {
    item: ItemRenderRowActionMenuItems;
    sx?: SxProps;
};

export function RenderRowActionMenuItem({ item, sx = {} }: Props): ReactNode {
    return (
        <Link
            component={RouterLink}
            href={item.href}
            key={item.name}
            sx={{ textDecoration: 'none', color: 'inherit' }}
        >
            <MenuItem sx={{ py: 2, ...sx }}>
                <IconWrapper icon={item.icon} mr={2} />
                {item.name}
            </MenuItem >
        </Link>
    )
}

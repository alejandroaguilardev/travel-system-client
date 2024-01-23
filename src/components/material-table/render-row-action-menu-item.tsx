import { ReactNode } from "react";
import { MenuItem, Link } from "@mui/material";
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
};

export function RenderRowActionMenuItem({ item }: Props): ReactNode {
    return (
        <Link
            component={RouterLink}
            href={item.href}
            style={{ textDecoration: 'none', color: 'inherit' }}
            key={item.name}
        >
            <MenuItem >
                <IconWrapper icon={item.icon} mr={2} />
                {item.name}
            </MenuItem >
        </Link>
    )
}

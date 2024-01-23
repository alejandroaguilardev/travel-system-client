import { FC, ForwardedRef } from 'react';
import { BoxProps } from '@mui/material/Box';
import { ICON_TYPE } from './types';
import SvgColor from '../svg-color';


export type IconKeys = keyof typeof ICON_TYPE;

interface Props extends BoxProps {
  icon: IconKeys;
  ref?: ForwardedRef<HTMLSpanElement>
}

const IconWrapper: FC<Props> = (({ ref, icon, width = 20, sx, ...other }) => (
  <SvgColor
    ref={ref}
    src={`/icons/${ICON_TYPE[icon]}`}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default IconWrapper;

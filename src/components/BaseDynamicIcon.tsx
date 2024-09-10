import * as Icons from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export const BaseDynamicIcon = ({ name, ...props }: { name: string } & SvgIconProps) => {
    const IconComponent = Icons[name as keyof typeof Icons];
    return IconComponent ? <IconComponent {...props} /> : null;
};
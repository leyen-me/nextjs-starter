import {
  Icon,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Menu } from "@prisma/client";
import { BaseDynamicIcon } from "../BaseDynamicIcon";

type Props = Menu & {
  icon: string;
  name: string;
  url?: string;
  selected: boolean;
  onClick: () => void;
  endIcon?: React.ReactNode;
  level: number;
};

export const MenuItem = ({
  url,
  name,
  icon,
  selected,
  onClick,
  endIcon,
  level,
}: Props) => {

  const color = selected ? "primary.main" : "primary.textColor";

  const link = (
    <ListItemButton
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ml: `${level * 16}px`,
        color,
      }}
    >
      <div className="flex items-center">
        <ListItemIcon
          sx={[
            { minWidth: "auto" },
            (theme) => ({
              paddingRight: theme.spacing(2),
              color,
            }),
          ]}
        >
          <BaseDynamicIcon name={icon} />
        </ListItemIcon>
        <ListItemText primary={name} />
      </div>
      {endIcon && (
        <ListItemIcon sx={{ minWidth: "auto" }}>{endIcon}</ListItemIcon>
      )}
    </ListItemButton>
  );

  return link;
};

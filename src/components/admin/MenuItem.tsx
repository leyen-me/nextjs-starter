import {
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IMenuItem } from "./contexts/drawer-context";

type Props = IMenuItem & {
  selected?: boolean;
  onClick?: () => void;
  endIcon?: React.ReactNode;
  level: number;
};

export const MenuItem: React.FC<Props> = ({
  route,
  literal,
  Icon,
  selected,
  onClick,
  endIcon,
  level,
}) => {
  
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
          <Icon sx={{ color: "primary.textColor" }} />
        </ListItemIcon>
        <ListItemText primary={literal} />
      </div>
      {endIcon && (
        <ListItemIcon sx={{ minWidth: "auto" }}>{endIcon}</ListItemIcon>
      )}
    </ListItemButton>
  );

  return link;
};

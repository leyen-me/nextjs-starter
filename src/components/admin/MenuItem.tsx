import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Menu } from "@prisma/client";
import { BaseDynamicIcon } from "../BaseDynamicIcon";
import { useI18n } from "../I18nProvider";
import { LABEL_TYPE, LabelType, MenuOpenStyle } from "@/contants";

type Props = {
  icon: string;
  name: string;
  url?: string;
  selected: boolean;
  onClick: () => void;
  endIcon?: React.ReactNode;
  level: number;
  nameType: LabelType;
};

export const MenuItem = ({
  url,
  name,
  icon,
  selected,
  onClick,
  endIcon,
  level,
  nameType,
}: Props) => {
  const { t } = useI18n();
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
            { minWidth: "auto", width: "24px", height: "24px" },
            (theme) => ({
              marginRight: theme.spacing(2),
              color,
            }),
          ]}
        >
          <BaseDynamicIcon name={icon} />
        </ListItemIcon>
        <ListItemText primary={nameType === LABEL_TYPE.I18N ? t(name) : name} />
      </div>
      {endIcon && (
        <ListItemIcon sx={{ minWidth: "auto" }}>{endIcon}</ListItemIcon>
      )}
    </ListItemButton>
  );

  return link;
};

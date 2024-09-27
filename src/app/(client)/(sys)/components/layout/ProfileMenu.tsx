import { Menu, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useI18n } from "@/components/I18nProvider";
type ProfileMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onItemClick: (item: string) => void;
};

export function ProfileMenu({
  anchorEl,
  open,
  onClose,
  onItemClick,
}: ProfileMenuProps) {
  const { t } = useI18n();
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={() => onItemClick("profile")}>
        <AccountCircleOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        {t("pages.common.profile")}
      </MenuItem>
      <MenuItem onClick={() => onItemClick("logout")}>
        <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
        {t("pages.common.logout")}
      </MenuItem>
    </Menu>
  );
}

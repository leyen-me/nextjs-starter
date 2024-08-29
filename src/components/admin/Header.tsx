import Image from "next/image";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Brightness7OutlinedIcon from "@mui/icons-material/Brightness7Outlined";
import { useDrawerContext } from "./contexts/drawer-context";
import { useState } from "react";
import { useTheme } from "../ThemeProvider";
import { signOut } from "next-auth/react";

export const Header = () => {
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const { theme, toggleTheme } = useTheme();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleMenuItemClick = (item: string) => {
    setUserMenuAnchorEl(null);
    if (item === "profile") {
      console.log("个人中心");
    } else if (item === "logout") {
      signOut();
    }
  };

  return (
    <AppBar>
      <Toolbar>
        <div className="w-full h-full flex justify-between">
          {/* Toggle button for opening/closing the drawer */}
          <div className="flex items-center gap-2">
            <IconButton
              color="inherit"
              onClick={() => toggleIsOpened(!isOpened)}
              sx={{ padding: theme.spacing(1) }}
            >
              {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6">Header</Typography>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <IconButton color="inherit" aria-label="notifications">
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="change language"
              onClick={(event) => setLanguageAnchorEl(event.currentTarget)}
            >
              <LanguageOutlinedIcon />
            </IconButton>
            {/* 国际化也是一个Menu，里面显示国旗和国家 */}
            <Menu
              anchorEl={languageAnchorEl}
              open={Boolean(languageAnchorEl)}
              onClose={() => setLanguageAnchorEl(null)}
            >
              <MenuItem>
                <Image
                  src="/assets/pngs/assets-icon-cn.png"
                  alt="Chinese"
                  width={20}
                  height={20}
                />
                <span className="ml-2">Chinese</span>
              </MenuItem>
              <MenuItem>
                <Image
                  src="/assets/pngs/assets-icon-us.png"
                  alt="English"
                  width={20}
                  height={20}
                />
                <span className="ml-2">English</span>
              </MenuItem>
            </Menu>

            <IconButton
              color="inherit"
              aria-label="toggle theme"
              onClick={() => {
                toggleTheme();
              }}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7OutlinedIcon />
              ) : (
                <Brightness4OutlinedIcon />
              )}
            </IconButton>

            {/* Menu items for profile and logout */}
            <IconButton
              color="inherit"
              onClick={(event) => setUserMenuAnchorEl(event.currentTarget)}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={() => setUserMenuAnchorEl(null)}
            >
              <MenuItem onClick={() => handleMenuItemClick("profile")}>
                <AccountCircleOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                个人中心
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("logout")}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                登出
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

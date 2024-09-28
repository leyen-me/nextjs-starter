import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Brightness7OutlinedIcon from "@mui/icons-material/Brightness7Outlined";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/Logo";
import { I18nMenu } from "@/components/I18nMenu";
import { ProfileMenu } from "./ProfileMenu";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useDrawerContext } from "./DrawerProvider";
import { useMenuStore } from "@/app/(client)/(sys)/stores/menuStore";

export const Header = ({ isLargeScreen }: { isLargeScreen: boolean }) => {
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const { theme, toggleTheme } = useTheme();
  const { getHeader } = useMenuStore();
  const router = useRouter();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleMenuItemClick = (item: string) => {
    setUserMenuAnchorEl(null);
    if (item === "profile") {
      router.push("/admin/account-setting");
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
            {isLargeScreen && <Logo mode="header" />}
            {!isLargeScreen && (
              <>
                <IconButton
                  color="inherit"
                  onClick={() => toggleIsOpened(!isOpened)}
                  sx={{ padding: theme.spacing(1) }}
                >
                  {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
                <Typography variant="h6">{getHeader()}</Typography>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <IconButton color="inherit">
              <NotificationsOutlinedIcon />
            </IconButton>

            <IconButton
              color="inherit"
              onClick={(event) => setLanguageAnchorEl(event.currentTarget)}
            >
              <LanguageOutlinedIcon />
            </IconButton>
            <I18nMenu
              anchorEl={languageAnchorEl}
              open={Boolean(languageAnchorEl)}
              onClose={() => setLanguageAnchorEl(null)}
            />

            <IconButton
              color="inherit"
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

            <IconButton
              color="inherit"
              onClick={(event) => setUserMenuAnchorEl(event.currentTarget)}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
            <ProfileMenu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={() => setUserMenuAnchorEl(null)}
              onItemClick={handleMenuItemClick}
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import {
  useMediaQuery,
  useTheme,
  Drawer as MuiDrawer,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useDrawerContext } from "./contexts/drawer-context";
import { MenuItemsList } from "./MenuItemsList";

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "isOpened",
})<{ isOpened: boolean }>(({ isOpened, theme }) => ({
  width: isOpened ? 240 : theme.spacing(7),
  height: "100%",
  overflow: "auto",
  transition: isOpened
    ? theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })
    : theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  "& .MuiDrawer-paper": {
    position: "static",
    overflowX: "hidden",
  },
}));

export const Logo = () => {
  return (
    <div className="w-full h-14 flex items-center justify-center">
      <Image
        src="/assets/svgs/assets-dark-logo.svg"
        alt="logo"
        width={0}
        height={0}
        className="w-[80%]"
      />
    </div>
  );
};

export const Drawer = () => {
  const { isOpened, toggleIsOpened, menu } = useDrawerContext();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <StyledDrawer
      variant={isLargeScreen ? "permanent" : "temporary"}
      open={!isLargeScreen && isOpened ? true : false}
      onClose={() => toggleIsOpened(!isOpened)}
      isOpened={isOpened}
    >
      <Logo />
      <MenuItemsList items={menu} />
    </StyledDrawer>
  );
};

import {
  Drawer as MuiDrawer,
  styled,
  Box,
  Divider,
} from "@mui/material";
import { useDrawerContext } from "./DrawerProvider";
import { MenuItemsList } from "./MenuItemsList";
import { useEffect } from "react";
import { Logo } from "@/components/Logo";

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

export const Drawer = ({ isLargeScreen }: { isLargeScreen: boolean }) => {
  const { isOpened, toggleIsOpened, menu } = useDrawerContext();

  useEffect(() => {
    if (isLargeScreen) {
      toggleIsOpened(true);
    }
  }, [isLargeScreen, toggleIsOpened]);

  return (
    <StyledDrawer
      variant={isLargeScreen ? "permanent" : "temporary"}
      open={!isLargeScreen && isOpened ? true : false}
      onClose={() => toggleIsOpened(!isOpened)}
      isOpened={isOpened}
    >
      {!isLargeScreen && (
        <Box className="w-full h-14 px-4" sx={{ color: "primary.textColor" }}>
          <Logo mode="header" />
          <Divider />
        </Box>
      )}
      <MenuItemsList items={menu} />
    </StyledDrawer>
  );
};

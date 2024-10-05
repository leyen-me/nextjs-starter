"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { Toolbar, Box, styled } from "@mui/material";

import { Header } from "./Header";
import { Drawer } from "./Drawer";
import { Main } from "./Main";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { useToast } from "@/components/ToastProvider";
import { DrawerProvider } from "./DrawerProvider";
import { useDictStore } from "@/app/(client)/(sys)/stores/dictStore";

export const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <DrawerProvider>
      <div className="flex flex-col overflow-hidden h-full min-h-screen">
        <Header isLargeScreen={isLargeScreen} />
        <Toolbar />
        <div className="flex flex-1 overflow-hidden h-full">
          <Drawer isLargeScreen={isLargeScreen} />
          <Main>{children}</Main>
        </div>
      </div>
    </DrawerProvider>
  );
};

import { ReactNode } from "react";
import { Toolbar, Box, styled } from "@mui/material";

import { Header } from "./Header";
import { Drawer } from "./Drawer";
import { Main } from "./Main";
import { DrawerContextProvider } from "./contexts/drawer-context";

export const Layout = ({ children }: { children: ReactNode }) => (
  <DrawerContextProvider>
    <div className="flex flex-col overflow-hidden h-full min-h-screen">
      <Header />
      <Toolbar />
      <div className="flex flex-1 overflow-hidden h-full">
        <Drawer />
        <Main>{children}</Main>
      </div>
    </div>
  </DrawerContextProvider>
);

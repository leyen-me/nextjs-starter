"use client";

import { ReactNode, useEffect } from "react";
import { Toolbar, Box, styled } from "@mui/material";

import { Header } from "./Header";
import { Drawer } from "./Drawer";
import { Main } from "./Main";
import { DrawerContextProvider } from "./contexts/drawer-context";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import api from "@/utils/request";
import type { GlobalConfig } from "@/app/api/config/route";
import { useDictionaryStore } from "@/stores/dictionaryStore";
import { useToast } from "../ToastProvider";

export const Layout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { setDictMap } = useDictionaryStore();
  const { showError } = useToast();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await api.get<GlobalConfig>("/api/config");
        const { dictMap } = data;
        setDictMap(dictMap);
      } catch (error: any) {
        showError(error)
      }
    };
    fetchConfig();
  }, []);

  return (
    <DrawerContextProvider>
      <div className="flex flex-col overflow-hidden h-full min-h-screen">
        <Header isLargeScreen={isLargeScreen} />
        <Toolbar />
        <div className="flex flex-1 overflow-hidden h-full">
          <Drawer isLargeScreen={isLargeScreen} />
          <Main>{children}</Main>
        </div>
      </div>
    </DrawerContextProvider>
  );
};

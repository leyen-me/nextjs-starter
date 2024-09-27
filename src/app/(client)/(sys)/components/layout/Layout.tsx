"use client";

import { ReactNode, useEffect } from "react";
import { Toolbar, Box, styled } from "@mui/material";

import { Header } from "./Header";
import { Drawer } from "./Drawer";
import { Main } from "./Main";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import api from "@/utils/request";
import { useDictionaryStore } from "@/stores/dictionaryStore";
import { GlobalConfig } from "@/app/(server)/(sys)/api/config/route";
import { useToast } from "@/components/ToastProvider";
import { DrawerProvider } from "./DrawerProvider";


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
  }, [setDictMap, showError]);

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

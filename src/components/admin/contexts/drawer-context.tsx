import { createContext, useState, useContext, useMemo } from "react";

import { SysMenu } from "@prisma/client";
import { useMenuContext } from "@/app/(client)/(sys)/components/AdminInfoProvider";

type DrawerContextType = {
  isOpened: boolean;
  toggleIsOpened: (value: boolean) => void;
  menu: SysMenu[];
};

type DrawerContextProviderProps = {
  children: React.ReactNode;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerContextProvider = ({
  children,
}: DrawerContextProviderProps) => {
  const [isOpened, toggleIsOpened] = useState(false);
  const { menuList } = useMenuContext();

  const value = useMemo(
    () => ({
      isOpened,
      toggleIsOpened,
      menu: menuList,
    }),
    [isOpened]
  );

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error(
      "useDrawerContext must be used within a DrawerContextProvider"
    );
  }
  return context;
};

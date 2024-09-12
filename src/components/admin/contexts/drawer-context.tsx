import { createContext, useState, useContext, useMemo } from "react";

import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import { useMenuContext } from "@/components/auth/AdminInfoProvider";
import { Menu } from "@prisma/client";

// export interface IMenuItem {
//   route?: string;
//   literal: string;
//   children?: IMenuItem[];
//   Icon: OverridableComponent<SvgIconTypeMap>;
// }

// export const ROUTES = {
//   main: "/dashboard",
//   orders: "/orders",
//   customers: "/customers",
//   inventory: "/inventory",
// };

type DrawerContextType = {
  isOpened: boolean;
  toggleIsOpened: (value: boolean) => void;
  menu: Menu[];
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

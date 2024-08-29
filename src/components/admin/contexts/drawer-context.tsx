import { createContext, useState, useContext, useMemo } from "react";

import type { SvgIconTypeMap } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";

export interface IMenuItem {
  route?: string;
  literal: string;
  children?: IMenuItem[];
  Icon: OverridableComponent<SvgIconTypeMap>;
}

export const ROUTES = {
  main: "/dashboard",
  orders: "/orders",
  customers: "/customers",
  inventory: "/inventory",
};

export const MENU_LIST: IMenuItem[] = [
  {
    route: ROUTES.main,
    literal: "Dashboard",
    Icon: DashboardIcon,
    children: [
      {
        route: `${ROUTES.main}/analytics`,
        literal: "Analytics",
        Icon: DashboardIcon,
      },
      {
        route: `${ROUTES.main}/reports`,
        literal: "Reports",
        Icon: DashboardIcon,
      },
    ],
  },
  {
    route: ROUTES.orders,
    literal: "Orders",
    Icon: ShoppingCartIcon,
    children: [
      {
        route: `${ROUTES.orders}/new`,
        literal: "New Orders",
        Icon: ShoppingCartIcon,
      },
      {
        route: `${ROUTES.orders}/processing`,
        literal: "Processing",
        Icon: ShoppingCartIcon,
      },
      {
        route: `${ROUTES.orders}/completed`,
        literal: "Completed",
        Icon: ShoppingCartIcon,
      },
    ],
  },
  {
    route: ROUTES.customers,
    literal: "Customers",
    Icon: PeopleIcon,
    children: [
      {
        route: `${ROUTES.customers}/list`,
        literal: "Customer List",
        Icon: PeopleIcon,
        children: [
          {
            route: `${ROUTES.customers}/list/active`,
            literal: "Active Customers",
            Icon: PeopleIcon,
          },
          {
            route: `${ROUTES.customers}/list/inactive`,
            literal: "Inactive Customers",
            Icon: PeopleIcon,
          },
        ],
      },
      {
        route: `${ROUTES.customers}/segments`,
        literal: "Customer Segments",
        Icon: PeopleIcon,
        children: [
          {
            route: `${ROUTES.customers}/segments/create`,
            literal: "Create Segment",
            Icon: PeopleIcon,
          },
          {
            route: `${ROUTES.customers}/segments/manage`,
            literal: "Manage Segments",
            Icon: PeopleIcon,
          },
        ],
      },
    ],
  },
  {
    route: ROUTES.inventory,
    literal: "Inventory",
    Icon: AttachMoneyIcon,
    children: [
      {
        route: `${ROUTES.inventory}/stock`,
        literal: "Stock Management",
        Icon: AttachMoneyIcon,
      },
      {
        route: `${ROUTES.inventory}/suppliers`,
        literal: "Suppliers",
        Icon: AttachMoneyIcon,
      },
    ],
  },
];

type DrawerContextType = {
  isOpened: boolean;
  toggleIsOpened: (value: boolean) => void;
  menu: IMenuItem[];
};

type DrawerContextProviderProps = {
  children: React.ReactNode;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerContextProvider = ({
  children,
}: DrawerContextProviderProps) => {
  const [isOpened, toggleIsOpened] = useState(false);

  const value = useMemo(
    () => ({
      isOpened,
      toggleIsOpened,
      menu: MENU_LIST,
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

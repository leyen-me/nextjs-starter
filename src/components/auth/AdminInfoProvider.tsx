import api from "@/utils/request";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { createContext, useContext } from "react";
import { Menu } from "@prisma/client";

type AdminInfoProviderProps = {
  children: React.ReactNode;
};

type MenuContextType = {
  menuList: Menu[];
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuProvider");
  }
  return context;
};


export function AdminInfoProvider({ children }: AdminInfoProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuList, setMenuList] = useState<Menu[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await api.get<Menu[]>("/api/user/menu");
        setMenuList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load necessary data. Please try again.");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }
  return <MenuContext.Provider value={{ menuList }}>{children}</MenuContext.Provider>;
}

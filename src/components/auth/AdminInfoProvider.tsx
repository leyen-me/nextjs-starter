import api from "@/utils/request";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { createContext, useContext } from "react";
import { Menu, User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { treeToMap } from "@/utils/tree";
import { MenuWithChildren } from "@/app/api/menu/[id]/route";
import { CONSTENTS_MENU_URL } from "@/contants";
import { useUserStore } from "@/stores/userStore";

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
  const userStore = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data:userInfo } = await api.get<User>("/api/user/info");
        userStore.setUser(userInfo);
        
        const { data } = await api.get<MenuWithChildren[]>("/api/user/menu");
        const menuMap = treeToMap<MenuWithChildren>(data);
        const menuList = Array.from(menuMap.values());
        CONSTENTS_MENU_URL.forEach((url) => {
          menuList.push({
            url,
          } as MenuWithChildren);
        });
       
        setMenuList(data);
        if (menuList.length === 0) {
          router.replace("/admin/login");
        } else {
          const hasRoute = menuList.find((menu) => {
            // 处理/admin/xxx/[url]
            const regex = new RegExp(`^${menu.url.replace(/\[.*?\]/, ".*")}$`);
            return regex.test(pathname);
          });
          if (!hasRoute) {
            router.replace("/404");
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load necessary data. Please try again.");
      } finally {
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
  return (
    <MenuContext.Provider value={{ menuList }}>{children}</MenuContext.Provider>
  );
}

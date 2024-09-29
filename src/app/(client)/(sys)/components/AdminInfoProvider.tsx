import api from "@/utils/request";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { SysMenu } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { treeToMap } from "@/utils/tree";
import { UserInfo } from "@/app/(server)/(sys)/api/user/info/route";
import { useUserStore } from "@/app/(client)/(sys)/stores/userStore";
import Loading from "@/components/Loading";
import { SYS_CONSTENTS_MENUS } from "../constans";
import { signOut } from "next-auth/react";

type AdminInfoProviderProps = {
  children: React.ReactNode;
};

type MenuContextType = {
  menuList: SysMenu[];
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
  const [menuList, setMenuList] = useState<SysMenu[]>([]);
  const userStore = useUserStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {


    const loadData = async () => {

      try {
        const { data: userInfo } = await api.get<UserInfo>("/api/user/info");
        userStore.setUser(userInfo);

        const { data } = await api.get<SysMenu[]>("/api/user/menu");
        const menuMap = treeToMap<SysMenu>(data);
        const menuList = Array.from(menuMap.values());
        SYS_CONSTENTS_MENUS.forEach((url) => {
          menuList.push({
            url,
          });
        });

        setMenuList(data);
        if (menuList.length === 0) {
          signOut();
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
        signOut();
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

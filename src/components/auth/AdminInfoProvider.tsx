import api from "@/utils/request";
import { useEffect, useState } from "react";
import Loading from "../Loading";

type AdminInfoProviderProps = {
  children: React.ReactNode;
};

export function AdminInfoProvider({ children }: AdminInfoProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 步骤 2: 获取用户菜单
        await api.get("/api/user/menu");

        // 步骤 3: 获取字典
        // await api.get("/api/dictionary");

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
  return <>{children}</>;
}

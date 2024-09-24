import { config } from "@/app/(server)/(sys)/api/auth/[...nextauth]/route";
import { UserInfo } from "@/app/(server)/(sys)/api/user/info/route";
import { getServerSession } from "next-auth";

export const getUser = async (): Promise<UserInfo> => {
  const session = await getServerSession(config);
  return session?.user as UserInfo;
};

// 服务端API权限校验
export const checkAuthority = async (authority: string | string[]) => {
  const user = await getUser();
  if (user.superAdmin) {
    return true;
  }
  if (Array.isArray(authority)) {
    return authority.some((auth) => user.authorityList.includes(auth));
  }
  return user.authorityList.includes(authority);
};

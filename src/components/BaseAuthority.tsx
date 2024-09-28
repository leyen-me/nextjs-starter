import { useMemo } from "react";
import { useUserStore } from "@/app/(client)/(sys)/stores/userStore";

type BaseAuthorityProps = {
  children: React.ReactNode;
  auth: string | string[];
};

export function BaseAuthority({ children, auth = "" }: BaseAuthorityProps) {
  const user = useUserStore().getUser();

  const hasAuthorityFunc = useMemo(() => {
    let hasAuthority = false;
    if (user.superAdmin) {
      hasAuthority = true;
    } else {
      if (Array.isArray(auth)) {
        if (auth.some((authority) => user.authorityList.includes(authority))) {
          hasAuthority = true;
        }
      } else {
        if (auth) {
          const authority = user.authorityList.find(
            (authority) => authority === auth
          );
          if (authority) {
            hasAuthority = true;
          }
        }
      }
    }
    return hasAuthority;
  }, [auth, user.authorityList, user.superAdmin]);

  return hasAuthorityFunc ? children : null;
}

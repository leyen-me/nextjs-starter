import { signOut, useSession } from "next-auth/react";

type AdminAuthProviderProps = {
  children: React.ReactNode;
};

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    const email = session?.user?.email;
    if (!email) {
      signOut();
    }
  }

  return <>{children}</>;
}

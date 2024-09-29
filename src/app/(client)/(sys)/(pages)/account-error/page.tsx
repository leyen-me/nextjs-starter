"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SYS_AUTH_ERROR } from "../../constans";
import AccountClosed from "../account-closed/page";
import AccountDeactivated from "../account-deactivated/page";
import { LOGIN_URL } from "@/contants";

export default function AccountErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  if (error === SYS_AUTH_ERROR.ACCOUNT_NOT_EXIST) {
    return <AccountClosed />;
  } else if (error === SYS_AUTH_ERROR.ACCOUNT_DISABLED) {
    return <AccountDeactivated />;
  } else if (error === SYS_AUTH_ERROR.UNKNOWN_ERROR) {
    router.replace(LOGIN_URL);
  }
  return <></>;
}

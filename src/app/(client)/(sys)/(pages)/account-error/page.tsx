"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SYS_AUTH_ERROR } from "../../constans";
import AccountClosed from "../account-closed/page";
import AccountDeactivated from "../account-deactivated/page";
import { LOGIN_URL } from "@/contants";
import { Suspense } from "react";

function AccountError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  if (error === SYS_AUTH_ERROR.ACCOUNT_NOT_EXIST) {
    return <AccountClosed />;
  } else if (error === SYS_AUTH_ERROR.ACCOUNT_DISABLED) {
    return <AccountDeactivated />;
  }
  return <>Unknown Error</>;
}

export default function AccountErrorPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <AccountError />
    </Suspense>
  );
}

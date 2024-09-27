import { NextRequest } from "next/server";

export default async function checkAuthority(
  req: NextRequest,
  authority: string
) {
  const user = req.context.user;
  if (user.superAdmin) {
    return true;
  }
  if (Array.isArray(authority)) {
    return authority.some((auth) => user.authorityList.includes(auth));
  }
  return user.authorityList.includes(authority);
}

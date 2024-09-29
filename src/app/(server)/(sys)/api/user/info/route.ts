import { buildSuccess } from "@/utils/response";
import { SysUser } from "@prisma/client";
import apiWrapper from "@/app/(server)/(sys)/utils/apiWrapper";
import { NextRequest, NextResponse } from "next/server";
type StorePartialUser = Partial<SysUser>;

export type UserInfo = StorePartialUser & {
  authorityList: string[];
};

async function handlerGet(req: NextRequest, res: NextResponse) {
  return buildSuccess({
    data: req.context.user,
  });
}

export const GET = apiWrapper(handlerGet);

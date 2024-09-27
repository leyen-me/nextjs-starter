import { buildError } from "@/utils/response";
import { NextRequest, NextResponse } from "next/server";
import { ResponseType } from "@/app/(server)/(sys)/types";
import { getServerSession } from "next-auth";
import { config } from "../api/auth/[...nextauth]/route";
import { SysUser } from "@prisma/client";
import { RESPONSE_CODE } from "@/contants";

export default function apiWrapper(
  handler: (
    req: NextRequest,
    res?: NextResponse | any
  ) => Promise<NextResponse<ResponseType<any>>>
) {
  return async (req: NextRequest, res: NextResponse) => {
    try {
      // 在这里添加通用逻辑，如错误处理、身份验证等
      const session = await getServerSession(config);
      if (!session || !session.user) {
        return buildError({
          code: RESPONSE_CODE.UNAUTHORIZED,
          message: "server.auth.loginExpired",
        });
      }

      // 放入请求上下文
      req.context = req.context || {};
      req.context.user = session.user as SysUser;
      return await handler(req, res);
    } catch (error) {
      console.log("error", error);
      // 全局异常拦截
      return buildError({});
    }
  };
}

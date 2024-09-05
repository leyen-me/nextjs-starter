import { buildSuccess } from "@/utils/response";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // 延时
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return buildSuccess({ data: { message: "Hello World" } });
}

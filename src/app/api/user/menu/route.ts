import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // 延时
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return NextResponse.json({ message: "Hello World" });
}

import { NextRequest } from "next/server";

/**
 * 获取分页参数
 * @param url 请求地址
 * @param filterKeys 过滤参数
 * @returns 分页参数
 */
export const getParams = (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams.entries());
  // 过滤掉为空字符串的
  const filters = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => value !== "")
  );
  return filters;
};
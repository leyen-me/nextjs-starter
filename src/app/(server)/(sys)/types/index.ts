import { LabelType, SysUser } from "@prisma/client";

export type ResponseType<T> = {
  code: number;
  message: string;
  messageType: LabelType;
  data: T;
};

type StorePartialUser = Partial<SysUser>;

export type UserInfo = StorePartialUser & {
  authorityList: string[];
};
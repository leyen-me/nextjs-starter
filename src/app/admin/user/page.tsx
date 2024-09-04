"use client";

import { BaseCrud } from "@/components/BaseCrud";
import { DICT_KEYS } from "@/contants";
import { FiltersOption } from "@/hooks/useFilter";
import { Gender, UserStatus } from "@prisma/client";

const UserPage = () => {
  // 基础路径
  const baseUrl = "/api/user";
  // 过滤条件选项
  const filtersOptions: FiltersOption[] = [
    {
      label: "邮箱",
      name: "email",
      type: "text",
      value: "",
    },
    {
      label: "昵称",
      name: "nickname",
      type: "text",
      value: "",
    },
    {
      label: "性别",
      name: "gender",
      type: "dict",
      dictKey: DICT_KEYS.Gender,
      value: "",
    },
    {
      label: "手机号",
      name: "mobile",
      type: "text",
      value: "",
    },
    {
      label: "状态",
      name: "status",
      type: "dict",
      dictKey: DICT_KEYS.UserStatus,
      value: "",
    }
  ]

  return <BaseCrud baseUrl={baseUrl}  filtersOptions={filtersOptions} />;
};

export default UserPage;
